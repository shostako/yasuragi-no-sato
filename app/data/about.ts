// 施設案内データ定義

export interface FacilityInfo {
  name: string;
  nameEn: string;
  established: string;
  president: string;
  employeeCount: string;
  address: string;
  postalCode: string;
  phone: string;
  fax: string;
  businessHours: string;
  services: string[];
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: string;
}

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  message: string;
  image: string;
  qualifications?: string[];
}

export interface AccessInfo {
  address: string;
  postalCode: string;
  phone: string;
  fax: string;
  businessHours: string;
  access: {
    method: string;
    description: string;
  }[];
  parking: string;
  mapEmbedUrl?: string;
}

// 施設基本情報
export const facilityInfo: FacilityInfo = {
  name: "やすらぎの郷",
  nameEn: "YASURAGI NO SATO",
  established: "2010年4月",
  president: "山田 太郎",
  employeeCount: "約50名",
  address: "東京都〇〇区〇〇町1-2-3",
  postalCode: "〒XXX-XXXX",
  phone: "0120-XXX-XXX",
  fax: "03-XXXX-XXXX",
  businessHours: "9:00〜18:00（年中無休）",
  services: [
    "デイサービス",
    "ショートステイ",
    "訪問介護",
    "グループホーム",
  ],
};

// 理念・方針
export const philosophy = {
  mission: "心に寄り添う、あたたかな介護",
  vision: "すべてのご利用者様が「自分らしく」輝ける場所を創る",
  description: `私たちやすらぎの郷は、「心に寄り添う、あたたかな介護」を理念に掲げ、
ご利用者様一人ひとりの尊厳を大切にしたケアを提供しています。

高齢化が進む現代社会において、介護サービスの役割はますます重要になっています。
私たちは、単なる身体的なケアだけでなく、心のケアも大切にし、
ご利用者様とそのご家族様が安心して過ごせる環境づくりに努めています。

「やすらぎの郷」という名前には、ここに来ればやすらげる、
心が落ち着く、そんな場所でありたいという願いが込められています。`,
  values: [
    {
      title: "尊厳",
      description: "ご利用者様一人ひとりの人格と個性を尊重し、自己決定を支援します。",
      icon: "heart",
    },
    {
      title: "安心",
      description: "24時間体制の見守りと、緊急時の迅速な対応で安心をお届けします。",
      icon: "shield",
    },
    {
      title: "つながり",
      description: "ご家族様、地域社会との絆を大切にし、開かれた施設運営を目指します。",
      icon: "users",
    },
    {
      title: "成長",
      description: "スタッフの専門性向上に努め、より質の高いサービスを追求します。",
      icon: "trending-up",
    },
  ] as PhilosophyItem[],
  presidentMessage: {
    name: "山田 太郎",
    title: "施設長",
    message: `やすらぎの郷のホームページをご覧いただき、誠にありがとうございます。

私たちは2010年の開設以来、「心に寄り添う、あたたかな介護」を
モットーに、地域の皆様に寄り添った介護サービスを提供してまいりました。

介護は、ご利用者様の「生きる」を支える仕事です。
身体的なケアはもちろんのこと、その方の人生の歩みを尊重し、
残された能力を最大限に活かしながら、
「その人らしい生活」を送っていただけるよう支援することが私たちの使命です。

スタッフ一同、日々研鑽を積み、より良いサービスの提供に努めております。
ぜひ一度、施設にお越しいただき、私たちの想いを感じていただければ幸いです。

皆様のお越しを心よりお待ちしております。`,
    image: "https://picsum.photos/seed/president1/400/400",
  },
};

// スタッフ紹介
export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "鈴木 花子",
    role: "介護主任",
    department: "デイサービス",
    message: "ご利用者様の笑顔が私の原動力です。一人ひとりに寄り添ったケアを心がけています。",
    image: "https://picsum.photos/seed/staff1/400/400",
    qualifications: ["介護福祉士", "認知症ケア専門士"],
  },
  {
    id: 2,
    name: "佐藤 一郎",
    role: "理学療法士",
    department: "リハビリテーション",
    message: "「できた！」という喜びを一緒に分かち合えることが、この仕事のやりがいです。",
    image: "https://picsum.photos/seed/staff2/400/400",
    qualifications: ["理学療法士", "介護支援専門員"],
  },
  {
    id: 3,
    name: "田中 美咲",
    role: "看護師",
    department: "医療ケア",
    message: "ご利用者様の健康を守り、安心して過ごせる環境づくりに貢献しています。",
    image: "https://picsum.photos/seed/staff3/400/400",
    qualifications: ["看護師", "准看護師"],
  },
  {
    id: 4,
    name: "高橋 健太",
    role: "ケアマネージャー",
    department: "相談支援",
    message: "ご利用者様とご家族様の架け橋となり、最適なケアプランをご提案します。",
    image: "https://picsum.photos/seed/staff4/400/400",
    qualifications: ["介護支援専門員", "社会福祉士"],
  },
  {
    id: 5,
    name: "渡辺 さくら",
    role: "管理栄養士",
    department: "栄養管理",
    message: "「おいしい！」の声が何より嬉しい。栄養バランスと味の両立を大切にしています。",
    image: "https://picsum.photos/seed/staff5/400/400",
    qualifications: ["管理栄養士"],
  },
  {
    id: 6,
    name: "伊藤 大輔",
    role: "介護スタッフ",
    department: "グループホーム",
    message: "入居者様との日々の触れ合いを大切に、家庭的な雰囲気づくりを心がけています。",
    image: "https://picsum.photos/seed/staff6/400/400",
    qualifications: ["介護福祉士"],
  },
];

// アクセス情報
export const accessInfo: AccessInfo = {
  address: "東京都〇〇区〇〇町1-2-3",
  postalCode: "〒XXX-XXXX",
  phone: "0120-XXX-XXX",
  fax: "03-XXXX-XXXX",
  businessHours: "9:00〜18:00（年中無休）",
  access: [
    {
      method: "電車でお越しの場合",
      description: "〇〇線「〇〇駅」東口より徒歩5分\n〇〇線「△△駅」南口より徒歩10分",
    },
    {
      method: "バスでお越しの場合",
      description: "〇〇バス「やすらぎの郷前」停留所下車すぐ\n△△バス「〇〇町」停留所より徒歩3分",
    },
    {
      method: "お車でお越しの場合",
      description: "〇〇インターチェンジより約10分\n国道〇〇号線「〇〇交差点」を左折、約200m",
    },
  ],
  parking: "施設専用駐車場 20台完備（無料）",
};

// 沿革
export const history = [
  { year: "2010年4月", event: "やすらぎの郷 開設（デイサービス・ショートステイ）" },
  { year: "2012年10月", event: "訪問介護事業所 開設" },
  { year: "2015年4月", event: "グループホーム「やすらぎ」 開設" },
  { year: "2018年6月", event: "施設リニューアル（リハビリ設備拡充）" },
  { year: "2020年4月", event: "開設10周年記念式典 開催" },
  { year: "2023年3月", event: "地域連携室 設置" },
];

// 施設ギャラリー
export const facilityGallery = [
  {
    id: 1,
    title: "エントランス",
    description: "明るく開放的なエントランスでお迎えします",
    image: "https://picsum.photos/seed/gallery1/800/600",
  },
  {
    id: 2,
    title: "デイルーム",
    description: "広々としたデイルームでレクリエーションを行います",
    image: "https://picsum.photos/seed/gallery2/800/600",
  },
  {
    id: 3,
    title: "機能訓練室",
    description: "充実したリハビリ設備を完備しています",
    image: "https://picsum.photos/seed/gallery3/800/600",
  },
  {
    id: 4,
    title: "浴室",
    description: "安全に配慮したバリアフリー設計の浴室",
    image: "https://picsum.photos/seed/gallery4/800/600",
  },
  {
    id: 5,
    title: "居室",
    description: "快適に過ごせるプライベート空間",
    image: "https://picsum.photos/seed/gallery5/800/600",
  },
  {
    id: 6,
    title: "中庭",
    description: "四季折々の風景を楽しめる中庭",
    image: "https://picsum.photos/seed/gallery6/800/600",
  },
];
