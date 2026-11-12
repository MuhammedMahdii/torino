export default function AboutPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-4 text-2xl font-bold">درباره تورینو</h1>
      <p className="max-w-3xl leading-8 text-soft">
        تورینو یک پلتفرم رزرو تور و سفر است که با تمرکز روی تجربه کاربری ساده،
        قیمت مناسب و پشتیبانی واقعی ساخته شده. هدف ما این است که انتخاب و خرید
        تور داخلی یا خارجی برای همه راحت‌تر شود.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: "تجربه سفر بهتر", d: "تورهای منتخب با جزئیات شفاف" },
          { t: "پشتیبانی واقعی", d: "همراهی قبل، حین و بعد از سفر" },
          { t: "پرداخت امن", d: "فرآیند رزرو ساده و قابل پیگیری" },
        ].map((item) => (
          <div key={item.t} className="rounded-2xl border border-line p-5 shadow-card">
            <h2 className="font-semibold text-primary">{item.t}</h2>
            <p className="mt-2 text-sm text-soft">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
