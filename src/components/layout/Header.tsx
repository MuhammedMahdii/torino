"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { cn, formatPhone } from "@/lib/utils";

const links = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/services", label: "خدمات گردشگری" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { isLoggedIn, user, openLogin, logout } = useAuthStore();

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const displayName = fullName || (user?.mobile ? formatPhone(user.mobile) : "حساب کاربری");
  const isPhoneName = !fullName && !!user?.mobile;

  return (
    <header className="torino-header sticky top-0 z-40">
      <div className="torino-page torino-gutter torino-header__inner">
        <Link href="/" className="shrink-0" aria-label="Torino">
          <Image
            src="/images/logo.png"
            alt="Torino"
            width={164}
            height={50}
            priority
            className="torino-logo"
          />
        </Link>

        <nav className="torino-header__nav">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(pathname === l.href && "is-active")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="torino-header__actions">
          <button
            type="button"
            className="torino-header__menu md:hidden"
            aria-label="منو"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenu((v) => !v)}
                className="torino-header__login"
              >
                <Image
                  src="/images/icons/user.svg"
                  alt=""
                  width={32}
                  height={32}
                />
                <span
                  className={cn(
                    "max-w-[140px] truncate",
                    isPhoneName && "torino-num",
                  )}
                  dir={isPhoneName ? "ltr" : undefined}
                >
                  {displayName}
                </span>
              </button>
              {userMenu && (
                <div className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-line bg-white shadow-card">
                  <Link
                    href="/profile"
                    className="block px-4 py-2.5 text-sm hover:bg-primary-light"
                    onClick={() => setUserMenu(false)}
                  >
                    اطلاعات حساب
                  </Link>
                  <Link
                    href="/profile/tours"
                    className="block px-4 py-2.5 text-sm hover:bg-primary-light"
                    onClick={() => setUserMenu(false)}
                  >
                    تورهای من
                  </Link>
                  <Link
                    href="/profile/transactions"
                    className="block px-4 py-2.5 text-sm hover:bg-primary-light"
                    onClick={() => setUserMenu(false)}
                  >
                    تراکنش‌ها
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-2.5 text-right text-sm text-danger hover:bg-red-50"
                    onClick={() => {
                      logout();
                      setUserMenu(false);
                    }}
                  >
                    خروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" onClick={openLogin} className="torino-header__login">
              <Image
                src="/images/icons/user.svg"
                alt=""
                width={32}
                height={32}
              />
              ورود | ثبت نام
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
