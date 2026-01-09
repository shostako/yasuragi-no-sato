import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-maru",
  display: "swap",
});

export const metadata: Metadata = {
  title: "やすらぎの郷 | 介護施設",
  description:
    "やすらぎの郷は、ご利用者様一人ひとりに寄り添い、温かみのある介護サービスを提供する施設です。デイサービス、ショートステイ、訪問介護など、多様なニーズにお応えします。",
  keywords: ["介護施設", "デイサービス", "ショートステイ", "訪問介護", "高齢者介護"],
  openGraph: {
    title: "やすらぎの郷 | 介護施設",
    description: "ご利用者様一人ひとりに寄り添い、温かみのある介護サービスを提供します。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenMaruGothic.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
