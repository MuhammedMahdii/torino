import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] items-center gap-8 py-10 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-[420px]">
        <BrokenTv />
      </div>

      <div className="space-y-6 text-center lg:text-right">
        <h1 className="text-3xl font-semibold text-muted md:text-4xl">
          صفحه مورد نظر یافت نشد!
        </h1>
        <Link
          href="/"
          className="inline-flex h-[75px] min-w-[280px] items-center justify-center rounded-2xl bg-[#D8FFE1] px-6 text-2xl font-semibold text-primary"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

function BrokenTv() {
  return (
    <svg viewBox="0 0 420 420" className="h-auto w-full" aria-hidden>
      <ellipse cx="210" cy="360" rx="140" ry="18" fill="#E3F0FF" />
      <rect x="90" y="120" width="220" height="170" rx="18" fill="#1C6F2F" />
      <rect x="110" y="140" width="150" height="110" rx="8" fill="#F8FBFF" />
      <rect x="110" y="140" width="150" height="28" rx="8" fill="#BDFFCC" />
      <text
        x="150"
        y="225"
        fill="#28A745"
        fontSize="48"
        fontWeight="700"
        fontFamily="Tahoma, sans-serif"
      >
        404
      </text>
      <circle cx="290" cy="175" r="8" fill="#28A745" />
      <circle cx="290" cy="205" r="8" fill="#28A745" />
      <rect x="280" y="230" width="18" height="8" rx="2" fill="#10411B" />
      <rect x="280" y="245" width="18" height="8" rx="2" fill="#10411B" />
      <rect x="280" y="260" width="18" height="8" rx="2" fill="#10411B" />
      <path d="M150 95l20 30M180 80l10 40" stroke="#E1ECFF" strokeWidth="8" />
      <path d="M300 90l25 35M330 100l20 30" stroke="#FF8D76" strokeWidth="7" />
      <path d="M95 200l-30 20M100 240l-28 10" stroke="#FEC272" strokeWidth="7" />
      <path d="M300 300l40 20M280 310l35 25" stroke="#FF8D76" strokeWidth="8" />
      <rect x="175" y="290" width="18" height="40" fill="#04671B" />
      <rect x="230" y="290" width="18" height="40" fill="#04671B" />
    </svg>
  );
}
