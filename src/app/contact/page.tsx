import { SUPPORT_PHONE } from "@/lib/constants";
import { formatPhone } from "@/lib/utils";

export default function ContactPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-4 text-2xl font-bold">تماس با ما</h1>
      <div className="max-w-xl space-y-4 rounded-2xl border border-line bg-white p-6 shadow-card">
        <p className="text-soft">
          برای مشاوره رایگان و پیگیری رزرو می‌توانید از راه‌های زیر با ما در
          ارتباط باشید.
        </p>
        <p>
          <span className="text-soft">تلفن پشتیبانی: </span>
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="torino-num font-semibold text-primary"
            dir="ltr"
          >
            {formatPhone(SUPPORT_PHONE)}
          </a>
        </p>
        <p>
          <span className="text-soft">ایمیل: </span>
          <a
            href="mailto:support@torino.ir"
            className="torino-num text-primary"
            dir="ltr"
          >
            support@torino.ir
          </a>
        </p>
        <p className="text-sm text-soft">ساعات پاسخگویی: همه روزه از ۹ تا ۲۳</p>
      </div>
    </div>
  );
}
