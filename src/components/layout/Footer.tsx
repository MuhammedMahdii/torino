import Image from "next/image";
import Link from "next/link";
import { FOOTER_PHONE } from "@/lib/constants";
import { formatPhone } from "@/lib/utils";

const torinoLinks = [
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/#why", label: "چرا تورینو" },
  { href: "/services", label: "بیمه مسافرتی" },
];

const serviceLinks = [
  { href: "/contact", label: "پشتیبانی آنلاین" },
  { href: "/services", label: "راهنمای خرید" },
  { href: "/services", label: "راهنمای استرداد" },
  { href: "/about", label: "پرسش و پاسخ" },
];

const badges = [
  "/images/badges/aira.png",
  "/images/badges/samandehi.png",
  "/images/badges/ecunion.png",
  "/images/badges/passenger.svg",
  "/images/badges/airline.svg",
];

export default function Footer() {
  return (
    <footer className="torino-footer">
      <div className="torino-page torino-gutter torino-footer__cols">
        <div>
          <h3>تورینو</h3>
          <ul>
            {torinoLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>خدمات مشتریان</h3>
          <ul>
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Image
            src="/images/logo.png"
            alt="Torino"
            width={164}
            height={50}
            className="torino-logo mb-4"
          />
          <p className="mb-5 text-[15px] text-black">
            تلفن پشتیبانی:{" "}
            <a
              href={`tel:${FOOTER_PHONE}`}
              className="torino-num font-medium"
              dir="ltr"
            >
              {formatPhone(FOOTER_PHONE)}
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            {badges.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={68}
                height={74}
                className="h-[74px] w-[68px] object-contain"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="torino-footer__copy">
        کلیه حقوق این وب سایت متعلق به تورینو میباشد.
      </div>
    </footer>
  );
}
