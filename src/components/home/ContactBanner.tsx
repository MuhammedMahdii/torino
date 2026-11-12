import Image from "next/image";
import Link from "next/link";
import { SUPPORT_PHONE } from "@/lib/constants";
import { formatPhone } from "@/lib/utils";

export default function ContactBanner() {
  return (
    <section className="torino-page torino-gutter mt-14">
      <div className="torino-banner">
        <div className="torino-banner__side">
          <div className="torino-banner__phone">
            <Image
              src="/images/icons/call.svg"
              alt=""
              width={24}
              height={24}
            />
            <a href={`tel:${SUPPORT_PHONE}`} className="torino-num" dir="ltr">
              {formatPhone(SUPPORT_PHONE)}
            </a>
          </div>
          <Link href="/contact" className="torino-banner__more">
            اطلاعات بیشتر
          </Link>
        </div>

        <div className="torino-banner__main">
          <div className="torino-banner__guy">
            <Image
              src="/images/phone-guy.png"
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="308px"
            />
          </div>
          <div className="torino-banner__copy">
            <h2>
              خرید تلفنی از <span>تورینو</span>
            </h2>
            <p>به هرکجا که میخواهید!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
