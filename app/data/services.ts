// サービスデータ定義

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  targetAudience: string;
  schedule: string;
  capacity: string;
  image: string;
  gallery: string[];
}

export const services: ServiceDetail[] = [
  {
    id: "day-service",
    title: "デイサービス",
    description: "日帰りで食事や入浴、機能訓練などのサービスを受けられます。",
    fullDescription:
      "デイサービス（通所介護）は、ご自宅で生活されている要介護の方が、日帰りで施設に通い、食事や入浴、レクリエーションなどのサービスを受けられます。心身機能の維持向上を図りながら、ご家族の介護負担軽減にも貢献します。",
    features: [
      "送迎サービス付き（ご自宅まで送り迎え）",
      "入浴介助（一般浴・機械浴対応）",
      "栄養バランスの取れた昼食・おやつ",
      "専門スタッフによる機能訓練",
      "季節のイベント・レクリエーション",
      "看護師による健康チェック",
    ],
    targetAudience: "要介護1〜5の方",
    schedule: "月曜日〜土曜日 9:00〜16:30",
    capacity: "定員30名",
    image: "/images/common-space.jpg",
    gallery: [
      "/images/care-scene.jpg",
      "/images/walking-practice.jpg",
      "/images/stuffed-animals.jpg",
    ],
  },
  {
    id: "short-stay",
    title: "ショートステイ",
    description: "短期間の宿泊サービス。ご家族の介護負担軽減をサポートします。",
    fullDescription:
      "ショートステイ（短期入所生活介護）は、介護を必要とする方が短期間施設に宿泊し、食事・入浴・排せつなどの日常生活上の支援や機能訓練を受けられるサービスです。ご家族の冠婚葬祭や旅行、介護疲れのリフレッシュ時にご利用いただけます。",
    features: [
      "24時間体制の見守りケア",
      "個室・多床室から選択可能",
      "入浴・排せつ介助",
      "機能訓練・リハビリテーション",
      "レクリエーション活動",
      "医療機関との連携体制",
    ],
    targetAudience: "要支援1〜2、要介護1〜5の方",
    schedule: "24時間対応（1泊2日〜最長30日）",
    capacity: "定員20名",
    image: "/images/private-room.jpg",
    gallery: [
      "/images/common-space.jpg",
      "/images/care-scene.jpg",
      "/images/tour.jpg",
    ],
  },
  {
    id: "home-care",
    title: "訪問介護",
    description: "ご自宅にホームヘルパーが訪問し、日常生活をサポートします。",
    fullDescription:
      "訪問介護は、ホームヘルパー（訪問介護員）がご自宅を訪問し、食事・入浴・排せつなどの身体介護や、掃除・洗濯・買い物などの生活援助を行うサービスです。住み慣れたご自宅で安心して生活を続けられるようサポートいたします。",
    features: [
      "身体介護（食事・入浴・排せつ介助）",
      "生活援助（掃除・洗濯・買い物）",
      "通院等乗降介助",
      "服薬確認・見守り",
      "ご家族への介護相談・アドバイス",
      "24時間対応可能（緊急時）",
    ],
    targetAudience: "要介護1〜5の方",
    schedule: "早朝〜夜間対応可能（事前相談）",
    capacity: "担当ヘルパー制",
    image: "/images/wheelchair.jpg",
    gallery: [
      "/images/facility-info.jpg",
      "/images/care-scene.jpg",
      "/images/staff.jpg",
    ],
  },
  {
    id: "group-home",
    title: "グループホーム",
    description: "認知症の方が少人数で共同生活を送る、家庭的な環境の施設です。",
    fullDescription:
      "グループホーム（認知症対応型共同生活介護）は、認知症の診断を受けた方が、少人数（5〜9人）で共同生活を送る施設です。家庭的な環境の中で、専門スタッフのサポートを受けながら、できる限り自立した日常生活を送ることができます。",
    features: [
      "少人数制の家庭的な環境",
      "認知症ケア専門のスタッフ",
      "個室完備でプライバシー確保",
      "日常生活動作のサポート",
      "地域との交流活動",
      "24時間365日の見守り体制",
    ],
    targetAudience: "要支援2、要介護1〜5で認知症の診断がある方",
    schedule: "入居型（24時間365日）",
    capacity: "2ユニット・定員18名",
    image: "/images/walk.jpg",
    gallery: [
      "/images/private-room.jpg",
      "/images/stuffed-animals.jpg",
      "/images/common-space.jpg",
    ],
  },
];

// アイコンは各ページでSVGとして定義（データに含めると複雑になるため）
export const serviceIcons: Record<string, string> = {
  "day-service": "sun",
  "short-stay": "home",
  "home-care": "map-pin",
  "group-home": "users",
};

export function getServiceById(id: string): ServiceDetail | undefined {
  return services.find((service) => service.id === id);
}
