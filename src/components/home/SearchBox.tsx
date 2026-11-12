"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { PLACES } from "@/lib/constants";

export default function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();

  const [originId, setOriginId] = useState(params.get("originId") || "");
  const [destinationId, setDestinationId] = useState(
    params.get("destinationId") || "",
  );
  const [range, setRange] = useState<DateObject[] | null>(() => {
    const s = params.get("startDate");
    const e = params.get("endDate");
    if (s && e) {
      return [
        new DateObject({ date: s, calendar: persian, locale: persian_fa }),
        new DateObject({ date: e, calendar: persian, locale: persian_fa }),
      ];
    }
    return null;
  });

  const origins = useMemo(() => PLACES, []);
  const destinations = useMemo(() => PLACES, []);

  const onSearch = () => {
    const q = new URLSearchParams();
    if (originId) q.set("originId", originId);
    if (destinationId) q.set("destinationId", destinationId);
    if (range?.[0]) q.set("startDate", range[0].toDate().toISOString());
    if (range?.[1]) q.set("endDate", range[1].toDate().toISOString());
    router.push(`/?${q.toString()}#tours`);
  };

  return (
    <section className="torino-page torino-gutter relative z-20 mt-4 md:mt-5">
      <div className="torino-search">
        <div className="torino-search__fields w-full">
          <label className="torino-search__field">
            <Image
              src="/images/icons/location.svg"
              alt=""
              width={20}
              height={20}
            />
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
            >
              <option value="">مبدا</option>
              {origins.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <span className="torino-search__divider" aria-hidden />

          <label className="torino-search__field">
            <Image
              src="/images/icons/globe.svg"
              alt=""
              width={20}
              height={20}
            />
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
            >
              <option value="">مقصد</option>
              {destinations.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <span className="torino-search__divider" aria-hidden />

          <label className="torino-search__field flex-1">
            <Image
              src="/images/icons/calendar.svg"
              alt=""
              width={20}
              height={20}
            />
            <DatePicker
              value={range || undefined}
              onChange={(val) => setRange(val as DateObject[] | null)}
              range
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              placeholder="تاریخ"
              inputClass="rmdp-input"
              containerClassName="torino-search__date"
            />
          </label>
        </div>

        <button type="button" onClick={onSearch} className="torino-search__btn">
          جستجو
        </button>
      </div>
    </section>
  );
}
