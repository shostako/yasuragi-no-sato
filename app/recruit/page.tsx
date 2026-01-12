import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  recruitMessage,
  jobPositions,
  benefits,
  staffVoices,
  selectionSteps,
  recruitFAQs,
} from "@/app/data/recruit";

export const metadata = {
  title: "採用情報 | やすらぎの郷",
  description:
    "やすらぎの郷では、介護スタッフ、看護師、ケアマネージャー、理学療法士などを募集しています。充実した研修制度とサポート体制で、あなたの成長を支援します。",
};

// アイコンコンポーネント
function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function getIcon(iconName: string, className?: string) {
  switch (iconName) {
    case "book-open":
      return <BookOpenIcon className={className} />;
    case "clock":
      return <ClockIcon className={className} />;
    case "heart":
      return <HeartIcon className={className} />;
    case "users":
      return <UsersIcon className={className} />;
    case "trending-up":
      return <TrendingUpIcon className={className} />;
    case "map-pin":
      return <MapPinIcon className={className} />;
    default:
      return <HeartIcon className={className} />;
  }
}

export default function RecruitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-24 md:py-32">
          <div className="absolute inset-0 bg-[url('/images/hero-building.png')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <p className="text-[var(--color-accent)] font-medium mb-4 tracking-wider">
                RECRUIT
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {recruitMessage.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {recruitMessage.subtitle}
              </p>
              <p className="text-lg leading-relaxed opacity-80 whitespace-pre-line max-w-2xl">
                {recruitMessage.description}
              </p>
              <div className="mt-10">
                <Link
                  href="#positions"
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] transition-colors"
                >
                  募集職種を見る
                  <ChevronDownIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* パンくずリスト */}
        <div className="bg-[var(--color-bg-secondary)] py-3">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-[var(--color-text-light)]">
              <Link href="/" className="hover:text-[var(--color-primary)]">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--color-text)]">採用情報</span>
            </nav>
          </div>
        </div>

        {/* 募集職種セクション */}
        <section id="positions" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[var(--color-primary)] font-medium mb-2">
                POSITIONS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                募集職種
              </h2>
            </div>

            <div className="space-y-8">
              {jobPositions.map((job) => (
                <div
                  key={job.id}
                  className="bg-[var(--color-bg-secondary)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={job.image}
                          alt={job.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                            {job.employmentType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                            {job.title}
                          </h3>
                          <p className="text-[var(--color-text-light)]">
                            {job.department}
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <BriefcaseIcon className="w-10 h-10 text-[var(--color-primary)]" />
                        </div>
                      </div>

                      <p className="text-[var(--color-text)] mb-6">
                        {job.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-[var(--color-primary)] min-w-[80px]">
                            給与
                          </span>
                          <span className="text-[var(--color-text)]">
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-[var(--color-primary)] min-w-[80px]">
                            勤務時間
                          </span>
                          <span className="text-[var(--color-text)]">
                            {job.workingHours}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-[var(--color-primary)] min-w-[80px]">
                            休日
                          </span>
                          <span className="text-[var(--color-text)]">
                            {job.holidays}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-[var(--color-border)] pt-4">
                        <p className="font-medium text-[var(--color-text)] mb-2">
                          応募要件
                        </p>
                        <ul className="space-y-1">
                          {job.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-[var(--color-text-light)]"
                            >
                              <CheckIcon className="w-4 h-4 text-[var(--color-accent)]" />
                              {req}
                            </li>
                          ))}
                        </ul>
                        {job.preferredQualifications && (
                          <div className="mt-3">
                            <p className="text-sm text-[var(--color-text-light)]">
                              <span className="font-medium">歓迎資格：</span>
                              {job.preferredQualifications.join("、")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 福利厚生セクション */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[var(--color-primary)] font-medium mb-2">
                BENEFITS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                福利厚生・働く環境
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-4">
                    {getIcon(benefit.icon, "w-7 h-7 text-[var(--color-primary)]")}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--color-text-light)] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 先輩スタッフの声セクション */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[var(--color-primary)] font-medium mb-2">
                VOICE
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                先輩スタッフの声
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {staffVoices.map((voice) => (
                <div
                  key={voice.id}
                  className="bg-[var(--color-bg-secondary)] rounded-2xl p-6 relative"
                >
                  {/* 引用符装飾 */}
                  <div className="absolute top-4 right-4 text-6xl text-[var(--color-primary)]/10 font-serif leading-none">
                    &rdquo;
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={voice.image}
                      alt={voice.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-[var(--color-text)]">
                        {voice.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-light)]">
                        {voice.role}
                      </p>
                      <p className="text-xs text-[var(--color-primary)]">
                        {voice.joinYear}
                      </p>
                    </div>
                  </div>

                  <p className="text-[var(--color-text)] leading-relaxed whitespace-pre-line text-sm">
                    {voice.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 選考フローセクション */}
        <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] font-medium mb-2">
                FLOW
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">選考フロー</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* 縦線 */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/30 md:left-1/2 md:-translate-x-1/2"></div>

                {selectionSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className="relative pl-16 pb-12 last:pb-0 md:pl-0"
                  >
                    {/* ステップ番号 */}
                    <div className="absolute left-0 top-0 w-12 h-12 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded-full flex items-center justify-center font-bold text-lg md:left-1/2 md:-translate-x-1/2 z-10">
                      {step.step}
                    </div>

                    {/* コンテンツ */}
                    <div
                      className={`md:w-[calc(50%-40px)] ${
                        index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-white/80">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[var(--color-primary)] font-medium mb-2">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                よくある質問
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {recruitFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-[var(--color-border)] rounded-xl overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        Q
                      </span>
                      <h3 className="text-lg font-bold text-[var(--color-text)] pt-0.5">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-[var(--color-bg-secondary)] p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded-full flex items-center justify-center font-bold text-sm">
                        A
                      </span>
                      <p className="text-[var(--color-text)] pt-0.5 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-20 bg-[var(--color-bg-secondary)]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6">
                ご応募・お問い合わせはこちら
              </h2>
              <p className="text-lg text-[var(--color-text-light)] mb-10">
                まずはお気軽にお問い合わせください。
                <br />
                施設見学も随時受け付けております。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  応募・お問い合わせ
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
                <a
                  href="tel:0120-XXX-XXX"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-10 py-4 rounded-full font-bold text-lg border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  0120-XXX-XXX
                </a>
              </div>
              <p className="mt-6 text-sm text-[var(--color-text-light)]">
                受付時間：9:00〜18:00（年中無休）
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
