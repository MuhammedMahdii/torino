export default function ServicesPage() {
  const services = [
    "رزرو تورهای داخلی و خارجی",
    "مشاوره انتخاب مقصد",
    "پشتیبانی تلفنی و آنلاین",
    "مدیریت رزرو و تراکنش‌ها",
  ];

  return (
    <div className="container-page py-10">
      <h1 className="mb-4 text-2xl font-bold">خدمات گردشگری</h1>
      <p className="mb-8 max-w-2xl text-soft">
        خدمات تورینو برای این طراحی شده که از جستجو تا خرید نهایی، مسیر ساده و
        قابل اعتماد داشته باشید.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <li
            key={s}
            className="rounded-2xl border border-line bg-white px-5 py-4 shadow-card"
          >
            <span className="ml-2 text-primary">●</span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
