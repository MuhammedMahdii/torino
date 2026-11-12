"use client";

import Image from "next/image";
import { useState } from "react";
import { toFaDigits } from "@/lib/utils";

const slides = [
  "/images/why/front.png",
  "/images/why/mid.png",
  "/images/why/back.png",
  "/images/why/far.png",
];

const features = [
  {
    title: "بصرفه ترین قیمت",
    desc: "بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.",
    icon: "/images/icons/ticket.svg",
  },
  {
    title: "پشتیبانی",
    desc: "پشتیبانی و همراهی ۲۴ ساعته در تمامی مراحل سفر شما.",
    icon: "/images/icons/message.svg",
  },
  {
    title: "رضایت کاربران",
    desc: "رضایت بیش از ۱۰ هزار کاربر از تور های ما.",
    icon: "/images/icons/heart.svg",
  },
];

export default function WhyTorino() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  const stack = [0, 1, 2, 3].map((offset) => ({
    src: slides[(index + offset) % slides.length],
    offset,
  }));

  return (
    <section id="why" className="torino-page torino-gutter mt-16 space-y-14">
      <div className="torino-why">
        <div className="order-2 lg:order-1">
          <div className="torino-why__stack">
            {stack.map(({ src, offset }) => {
              const layer =
                offset === 0
                  ? "z-40 left-[30%] top-[8%] h-[82%] w-[70%]"
                  : offset === 1
                    ? "z-30 left-[20%] top-[14%] h-[72%] w-[68%]"
                    : offset === 2
                      ? "z-20 left-[12%] top-[22%] h-[58%] w-[48%]"
                      : "z-10 left-[6%] top-[28%] h-[48%] w-[40%]";
              return (
                <div key={`${src}-${offset}`} className={`torino-why__card ${layer}`}>
                  <Image src={src} alt="" fill className="object-cover" sizes="390px" />
                </div>
              );
            })}
          </div>
          <div className="torino-why__pager">
            <button type="button" onClick={next} aria-label="بعدی">
              <Image
                src="/images/icons/arrow-left.svg"
                alt=""
                width={36}
                height={36}
              />
            </button>
            <p className="torino-num" dir="ltr">
              {toFaDigits(index + 1)} /{" "}
              <span className="opacity-70">{toFaDigits(slides.length)}</span>
            </p>
            <button type="button" onClick={prev} aria-label="قبلی">
              <Image
                src="/images/icons/arrow-right.svg"
                alt=""
                width={36}
                height={36}
              />
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:pt-8">
          <h2 className="torino-why__title">
            <Image
              src="/images/icons/qmark.svg"
              alt=""
              width={59}
              height={68}
              className="h-12 w-10 md:h-[68px] md:w-[59px]"
            />
            <span>
              چرا <span className="green">تورینو</span> ؟
            </span>
          </h2>
          <h3 className="torino-why__sub">تور طبیعت گردی و تاریخی</h3>
          <p className="torino-why__body">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت
            چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی
            را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و آثار تاریخی یک
            مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و تاریخی را خریداری کنید.
          </p>
        </div>
      </div>

      <div className="torino-features">
        {features.map((f) => (
          <div key={f.title} className="torino-feature flex items-start gap-3">
            <Image
              src={f.icon}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 object-contain"
            />
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
