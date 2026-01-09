// 採用情報データ定義

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  employmentType: string;
  description: string;
  requirements: string[];
  preferredQualifications?: string[];
  salary: string;
  workingHours: string;
  holidays: string;
  benefits: string[];
  image: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StaffVoice {
  id: number;
  name: string;
  role: string;
  joinYear: string;
  message: string;
  image: string;
}

export interface SelectionStep {
  step: number;
  title: string;
  description: string;
}

export interface RecruitFAQ {
  id: number;
  question: string;
  answer: string;
}

// 採用メッセージ
export const recruitMessage = {
  title: "あなたの「想い」を活かせる場所",
  subtitle: "共に成長し、共に支え合う仲間を募集しています",
  description: `やすらぎの郷では、ご利用者様一人ひとりに寄り添った介護を
大切にしています。私たちと一緒に、「心に寄り添う、あたたかな介護」を
実現しませんか？

経験の有無は問いません。大切なのは「人の役に立ちたい」という想い。
充実した研修制度とサポート体制で、あなたの成長を全力でバックアップします。`,
};

// 募集職種
export const jobPositions: JobPosition[] = [
  {
    id: "care-staff",
    title: "介護スタッフ",
    department: "デイサービス・ショートステイ・グループホーム",
    employmentType: "正社員・パート",
    description:
      "ご利用者様の日常生活のサポートを行います。食事、入浴、排泄の介助から、レクリエーションの企画・実施まで、幅広い業務をお任せします。",
    requirements: [
      "普通自動車免許（AT限定可）",
      "介護に興味・関心のある方",
      "チームワークを大切にできる方",
    ],
    preferredQualifications: [
      "介護福祉士",
      "介護職員初任者研修修了者",
      "実務者研修修了者",
    ],
    salary: "月給 200,000円〜280,000円（経験・資格による）",
    workingHours: "シフト制（7:00〜20:00の間で8時間勤務）",
    holidays: "週休2日制（シフト制）、年間休日110日",
    benefits: [
      "社会保険完備",
      "交通費支給",
      "資格取得支援制度",
      "賞与年2回",
    ],
    image: "/images/care-scene.jpg",
  },
  {
    id: "nurse",
    title: "看護師",
    department: "医療ケア部門",
    employmentType: "正社員・パート",
    description:
      "ご利用者様の健康管理、医療的ケア、服薬管理などを担当します。医師との連携、介護スタッフへの指導・助言も重要な役割です。",
    requirements: [
      "正看護師または准看護師の資格をお持ちの方",
      "高齢者介護に興味のある方",
    ],
    preferredQualifications: ["病院での勤務経験", "介護施設での勤務経験"],
    salary: "月給 280,000円〜350,000円（経験・資格による）",
    workingHours: "日勤のみ（8:30〜17:30）※オンコールあり",
    holidays: "週休2日制（土日祝中心）、年間休日120日",
    benefits: [
      "社会保険完備",
      "交通費支給",
      "オンコール手当",
      "賞与年2回",
    ],
    image: "/images/facility-info.jpg",
  },
  {
    id: "care-manager",
    title: "ケアマネージャー",
    department: "相談支援部門",
    employmentType: "正社員",
    description:
      "ご利用者様・ご家族様との相談対応、ケアプランの作成・管理、関係機関との連携調整を行います。",
    requirements: [
      "介護支援専門員の資格をお持ちの方",
      "普通自動車免許（AT限定可）",
    ],
    preferredQualifications: ["居宅介護支援事業所での勤務経験"],
    salary: "月給 250,000円〜320,000円（経験による）",
    workingHours: "8:30〜17:30（残業月10時間程度）",
    holidays: "完全週休2日制（土日祝）、年間休日125日",
    benefits: [
      "社会保険完備",
      "交通費支給",
      "研修制度充実",
      "賞与年2回",
    ],
    image: "/images/tour.jpg",
  },
  {
    id: "pt-ot",
    title: "理学療法士・作業療法士",
    department: "リハビリテーション部門",
    employmentType: "正社員",
    description:
      "ご利用者様の身体機能の維持・改善を目指したリハビリテーションプログラムの立案・実施を行います。",
    requirements: [
      "理学療法士または作業療法士の資格をお持ちの方",
      "高齢者リハビリに興味のある方",
    ],
    preferredQualifications: ["介護保険領域での勤務経験"],
    salary: "月給 260,000円〜330,000円（経験による）",
    workingHours: "8:30〜17:30",
    holidays: "完全週休2日制（土日祝）、年間休日125日",
    benefits: [
      "社会保険完備",
      "交通費支給",
      "学会参加費補助",
      "賞与年2回",
    ],
    image: "/images/walking-practice.jpg",
  },
];

// 福利厚生
export const benefits: Benefit[] = [
  {
    id: "training",
    title: "充実した研修制度",
    description:
      "入社時研修から専門研修まで、段階的なプログラムであなたの成長をサポート。資格取得支援制度も充実しています。",
    icon: "book-open",
  },
  {
    id: "balance",
    title: "ワークライフバランス",
    description:
      "有給休暇取得推進、残業削減に積極的に取り組んでいます。育児・介護休業の取得実績も多数あります。",
    icon: "clock",
  },
  {
    id: "health",
    title: "健康サポート",
    description:
      "年1回の健康診断、インフルエンザ予防接種補助、メンタルヘルスケア体制を整えています。",
    icon: "heart",
  },
  {
    id: "team",
    title: "チームワーク重視",
    description:
      "定期的なミーティングや懇親会で、部署を超えたコミュニケーションを大切にしています。",
    icon: "users",
  },
  {
    id: "career",
    title: "キャリアアップ支援",
    description:
      "資格取得費用の補助、外部研修への参加支援など、スキルアップを応援する制度が充実しています。",
    icon: "trending-up",
  },
  {
    id: "location",
    title: "通勤しやすい立地",
    description:
      "最寄り駅から徒歩5分、無料駐車場完備で車通勤もOK。交通費は全額支給します。",
    icon: "map-pin",
  },
];

// 先輩スタッフの声
export const staffVoices: StaffVoice[] = [
  {
    id: 1,
    name: "山本 優子",
    role: "介護スタッフ",
    joinYear: "2020年入社",
    message: `未経験からのスタートで不安もありましたが、先輩方が丁寧に教えてくださり、
今では自信を持って業務に取り組めています。ご利用者様の「ありがとう」という言葉が、
何よりのやりがいです。研修制度も充実していて、介護福祉士の資格も取得できました。`,
    image: "/images/staff.jpg",
  },
  {
    id: 2,
    name: "小林 健一",
    role: "介護主任",
    joinYear: "2015年入社",
    message: `病院からの転職でしたが、利用者様とじっくり向き合える環境に魅力を感じて入社しました。
チームワークが良く、困ったときはすぐに相談できる雰囲気があります。
今は主任として後輩の育成にも携わり、やりがいを感じています。`,
    image: "/images/staff.jpg",
  },
  {
    id: 3,
    name: "中村 美穂",
    role: "看護師",
    joinYear: "2018年入社",
    message: `病院とは違い、利用者様の生活全体を見守れることが魅力です。
介護スタッフとの連携も良く、チーム全体でケアを行う一体感があります。
日勤のみでワークライフバランスも取りやすく、家庭との両立ができています。`,
    image: "/images/staff.jpg",
  },
];

// 選考フロー
export const selectionSteps: SelectionStep[] = [
  {
    step: 1,
    title: "応募・お問い合わせ",
    description:
      "お問い合わせフォームまたはお電話にてご連絡ください。施設見学も随時受け付けています。",
  },
  {
    step: 2,
    title: "書類選考",
    description:
      "履歴書・職務経歴書をご提出ください。書類選考の結果は1週間以内にご連絡します。",
  },
  {
    step: 3,
    title: "面接・施設見学",
    description:
      "面接は1回を予定しています。実際に施設を見学いただき、雰囲気を感じてください。",
  },
  {
    step: 4,
    title: "内定・入社",
    description:
      "面接後1週間以内に結果をご連絡します。入社日はご相談の上、決定いたします。",
  },
];

// よくある質問（採用関連）
export const recruitFAQs: RecruitFAQ[] = [
  {
    id: 1,
    question: "未経験でも応募できますか？",
    answer:
      "はい、未経験の方も大歓迎です。入社後の研修で基礎から学んでいただけますし、先輩スタッフがしっかりサポートします。介護の仕事に興味があり、「人の役に立ちたい」という気持ちがあれば、ぜひご応募ください。",
  },
  {
    id: 2,
    question: "勤務時間や休日について教えてください。",
    answer:
      "職種により異なりますが、基本的にシフト制または日勤固定となります。週休2日制で、年間休日は110日〜125日です。有給休暇も取得しやすい環境を整えています。",
  },
  {
    id: 3,
    question: "資格取得のサポートはありますか？",
    answer:
      "はい、資格取得支援制度があります。介護福祉士や介護支援専門員などの資格取得に向けた費用補助や、勉強時間の確保などをサポートしています。",
  },
  {
    id: 4,
    question: "施設見学はできますか？",
    answer:
      "はい、随時受け付けています。実際に施設の雰囲気を見ていただき、スタッフとお話しすることもできます。お気軽にお問い合わせください。",
  },
  {
    id: 5,
    question: "子育て中でも働けますか？",
    answer:
      "はい、子育てと両立しながら働いているスタッフも多数在籍しています。シフトの相談に柔軟に対応しており、育児休業・時短勤務の実績もあります。",
  },
];
