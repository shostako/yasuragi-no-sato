import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface NotifyRequest {
  type: "reservation" | "contact";
  data: {
    name: string;
    furigana?: string;
    email: string;
    phone?: string;
    date?: string;
    timeSlot?: string;
    participants?: number;
    message?: string;
  };
}

// HTMLエスケープ（XSS対策）
function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// バリデーション
function validateRequest(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const req = body as NotifyRequest;

  // type チェック
  if (!req.type || !["reservation", "contact"].includes(req.type)) {
    return { valid: false, error: "Invalid type" };
  }

  // data チェック
  if (!req.data || typeof req.data !== "object") {
    return { valid: false, error: "Invalid data" };
  }

  // 必須フィールド
  if (!req.data.name || typeof req.data.name !== "string") {
    return { valid: false, error: "Name is required" };
  }
  if (!req.data.email || typeof req.data.email !== "string") {
    return { valid: false, error: "Email is required" };
  }

  // メールフォーマット（簡易チェック）
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.data.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // サイズ制限（スパム対策）
  if (req.data.name.length > 100) {
    return { valid: false, error: "Name too long" };
  }
  if (req.data.email.length > 254) {
    return { valid: false, error: "Email too long" };
  }
  if (req.data.message && req.data.message.length > 5000) {
    return { valid: false, error: "Message too long" };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    console.error("RESEND_API_KEY or ADMIN_EMAIL is not set");
    // 環境変数未設定でも本体の処理は成功させる（通知は静かに失敗）
    return NextResponse.json({ success: true, notified: false });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();

    // バリデーション
    const validation = validateRequest(body);
    if (!validation.valid) {
      console.error("Validation failed:", validation.error);
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const typedBody = body as NotifyRequest;
    const { subject, html } = formatEmail(typedBody);

    const { error } = await resend.emails.send({
      from: "Yasuragi Notification <onboarding@resend.dev>",
      to: adminEmail,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: true, notified: false });
    }

    return NextResponse.json({ success: true, notified: true });
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json({ success: true, notified: false });
  }
}

function formatEmail(body: NotifyRequest): { subject: string; html: string } {
  const { type, data } = body;

  // 全フィールドをエスケープ
  const name = escapeHtml(data.name);
  const furigana = escapeHtml(data.furigana);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const date = escapeHtml(data.date);
  const timeSlot = escapeHtml(data.timeSlot);
  const message = escapeHtml(data.message);
  const participants = data.participants;

  if (type === "reservation") {
    return {
      subject: `【新規予約】${name}様 - ${date} ${timeSlot}`,
      html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head><meta charset="UTF-8"></head>
        <body>
        <div style="font-family: 'Hiragino Sans', 'Meiryo', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5D4E37; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            新規予約のお知らせ
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; width: 120px;">お名前</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${name}</strong> 様</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">フリガナ</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${furigana}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">メール</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">電話番号</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || "未入力"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">希望日</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${date}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">時間帯</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${timeSlot}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">見学人数</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${participants}名</td>
            </tr>
          </table>

          <p style="color: #666; font-size: 14px;">
            管理画面で詳細を確認してください。
          </p>
        </div>
        </body>
        </html>
      `,
    };
  }

  if (type === "contact") {
    return {
      subject: `【新規お問い合わせ】${name}様`,
      html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head><meta charset="UTF-8"></head>
        <body>
        <div style="font-family: 'Hiragino Sans', 'Meiryo', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5D4E37; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            新規お問い合わせ
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; width: 120px;">お名前</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${name}</strong> 様</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">フリガナ</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${furigana}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">メール</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">電話番号</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || "未入力"}</td>
            </tr>
          </table>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #666; font-size: 12px; margin: 0 0 10px 0;">お問い合わせ内容：</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 14px;">
            管理画面で詳細を確認してください。
          </p>
        </div>
        </body>
        </html>
      `,
    };
  }

  return {
    subject: "【やすらぎの郷】新しい通知",
    html: "<p>新しい通知があります。管理画面で確認してください。</p>",
  };
}
