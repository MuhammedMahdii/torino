"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { getTour } from "@/services/tourApi";
import { addToBasket } from "@/services/basketApi";
import { useAuthStore } from "@/store/authStore";
import {
  apiImage,
  dayDiff,
  formatPrice,
  placeName,
  toFaDigits,
  vehicleLabel,
} from "@/lib/utils";

const FEATURES = [
  { label: "تورلیدر از مبدا", icon: "/images/icons/user.svg" },
  { label: "برنامه سفر", icon: "/images/icons/route.svg" },
  { label: "تضمین کیفیت", icon: "/images/icons/quality.svg" },
];

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isLoggedIn, openLogin } = useAuthStore();

  const { data: tour, isLoading, isError } = useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id),
    enabled: !!id,
  });

  const onReserve = async () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    try {
      await addToBasket(id);
      toast.success("تور به سبد اضافه شد");
      router.push("/checkout");
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      toast.error(msg || "خطا در رزرو تور");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="torino-page torino-gutter py-16 text-center text-danger">
        تور مورد نظر پیدا نشد.
      </div>
    );
  }

  const nights = Math.max(0, dayDiff(tour.startDate, tour.endDate) - 1);
  const days = dayDiff(tour.startDate, tour.endDate);
  const start = toFaDigits(
    new Date(tour.startDate).toLocaleDateString("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );
  const end = toFaDigits(
    new Date(tour.endDate).toLocaleDateString("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );

  const insuranceText =
    typeof tour.insurance === "string"
      ? tour.insurance
      : tour.insurance
        ? "بیمه ۵۰ هزار دیناری"
        : "ندارد";

  const meta = [
    {
      label: "مبدا",
      value: placeName(tour.origin?.name),
      icon: "/images/icons/location.svg",
    },
    {
      label: "تاریخ رفت",
      value: start,
      icon: "/images/icons/calendar.svg",
    },
    {
      label: "تاریخ برگشت",
      value: end,
      icon: "/images/icons/calendar.svg",
    },
    {
      label: "حمل و نقل",
      value: vehicleLabel(tour.fleetVehicle),
      icon: "/images/icons/bus.svg",
    },
    {
      label: "ظرفیت",
      value: `حداکثر ${toFaDigits(tour.availableSeats)} نفر`,
      icon: "/images/icons/users.svg",
    },
    {
      label: "بیمه",
      value: insuranceText,
      icon: "/images/icons/shield.svg",
    },
  ];

  return (
    <div className="torino-detail">
      <div className="torino-page torino-gutter">
        <article className="torino-detail__card">
          <div className="torino-detail__top">
            <div className="torino-detail__img">
              <Image
                src={apiImage(tour.image)}
                alt={tour.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            <div className="torino-detail__body">
              <h1 className="torino-detail__title">{tour.title}</h1>
              <p className="torino-detail__days">
                {toFaDigits(days)} روز و {toFaDigits(nights)} شب
              </p>

              <div className="torino-detail__features">
                {FEATURES.map((f) => (
                  <span key={f.label} className="torino-detail__feature">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.icon} alt="" />
                    {f.label}
                  </span>
                ))}
              </div>

              <div className="torino-detail__cta">
                <p className="torino-detail__price">
                  {formatPrice(tour.price)}
                  <span>تومان</span>
                </p>
                <button
                  type="button"
                  onClick={onReserve}
                  className="torino-detail__btn"
                >
                  رزرو و خرید
                </button>
              </div>
            </div>
          </div>

          <div className="torino-detail__meta">
            {meta.map((item) => (
              <div key={item.label} className="torino-detail__meta-item">
                <span className="torino-detail__meta-label">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon} alt="" />
                  {item.label}
                </span>
                <span className="torino-detail__meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
