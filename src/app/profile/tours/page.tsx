"use client";

import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { getUserTours } from "@/services/userApi";
import {
  formatPrice,
  placeName,
  toFaDigits,
  vehicleLabel,
} from "@/lib/utils";

export default function MyToursPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-tours"],
    queryFn: getUserTours,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-xl bg-red-50 p-4 text-danger">خطا در دریافت تورها</p>
    );
  }

  return (
    <div className="torino-profile-card">
      {!data?.length && (
        <div className="py-10 text-center">
          <p className="text-[15px] text-[rgba(40,40,40,0.6)]">
            هنوز توری خریداری نکرده‌اید.
          </p>
          <Link href="/#tours" className="mt-3 inline-block text-[#28A745]">
            مشاهده تورها
          </Link>
        </div>
      )}

      <div>
        {data?.filter(Boolean).map((tour) => {
          const start = toFaDigits(
            new Date(tour.startDate).toLocaleDateString("fa-IR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          );
          const end = toFaDigits(
            new Date(tour.endDate).toLocaleDateString("fa-IR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          );
          const now = Date.now();
          const startMs = new Date(tour.startDate).getTime();
          const endMs = new Date(tour.endDate).getTime();
          const done = endMs < now;
          const live = startMs <= now && endMs >= now;
          const tourNo = toFaDigits(
            String(tour.id).replace(/\D/g, "").slice(0, 9) ||
              tour.id.slice(0, 8),
          );

          return (
            <article key={tour.id} className="torino-tour-book">
              <div className="torino-tour-book__top">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                  <p className="torino-tour-book__title">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/icons/sun-tour.svg" alt="" width={20} height={20} />
                    {tour.title}
                  </p>
                  <p className="torino-tour-book__vehicle">
                    سفر با {vehicleLabel(tour.fleetVehicle)}
                  </p>
                </div>
                <span
                  className={`torino-badge ${done ? "torino-badge--done" : "torino-badge--live"}`}
                >
                  {done
                    ? "به اتمام رسیده"
                    : live
                      ? "در حال برگزاری"
                      : "در انتظار برگزاری"}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-10 gap-y-2 text-[14px]">
                <p className="torino-tour-book__route font-medium">
                  {placeName(tour.origin?.name)} به{" "}
                  {placeName(tour.destination?.name)}
                </p>
                <p className="torino-tour-book__dates">{start}</p>
                <p className="torino-tour-book__dates">
                  <span className="font-medium text-[#282828]">تاریخ برگشت</span>{" "}
                  {end}
                </p>
              </div>

              <div className="torino-tour-book__foot">
                <span>
                  شماره تور{" "}
                  <span className="torino-num" dir="ltr">
                    {tourNo}
                  </span>
                </span>
                <span>
                  مبلغ پرداخت شده{" "}
                  <strong className="torino-num font-semibold" dir="ltr">
                    {formatPrice(tour.price)}
                  </strong>{" "}
                  <span className="text-[rgba(40,40,40,0.55)]">تومان</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
