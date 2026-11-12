"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    href: "/profile",
    label: "پروفایل",
    icon: "/images/icons/user.svg",
  },
  {
    href: "/profile/tours",
    label: "تور های من",
    short: "تورهای من",
    icon: "/images/icons/sun-tour.svg",
  },
  {
    href: "/profile/transactions",
    label: "تراکنش ها",
    short: "تراکنش‌ها",
    icon: "/images/icons/wallet.svg",
  },
];

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <aside className="torino-profile-nav">
      <nav className="torino-profile-nav__list">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("torino-profile-nav__link", active && "is-active")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt="" />
              <span className="torino-profile-nav__label-full">{item.label}</span>
              <span className="torino-profile-nav__label-short">
                {item.short || item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
