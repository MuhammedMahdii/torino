import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/types";
import {
  apiImage,
  dayDiff,
  formatPrice,
  toFaDigits,
  vehicleLabel,
} from "@/lib/utils";

type Props = {
  tour: Tour;
};

export default function TourCard({ tour }: Props) {
  const days = dayDiff(tour.startDate, tour.endDate);
  const month = tour.startDate
    ? new Date(tour.startDate).toLocaleDateString("fa-IR", { month: "long" })
    : "";
  const meta = [
    month ? `${month} ماه` : null,
    `${toFaDigits(days)} روزه`,
    vehicleLabel(tour.fleetVehicle),
    tour.options?.[0],
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <article className="torino-card">
      <div className="torino-card__img bg-gray-100">
        <Image
          src={apiImage(tour.image)}
          alt={tour.title}
          fill
          className="rounded-t-[10px] object-cover"
          sizes="278px"
          unoptimized
        />
      </div>
      <div className="torino-card__body">
        <h3 className="torino-card__title line-clamp-1">{tour.title}</h3>
        <p className="torino-card__meta">{meta}</p>
        <div className="torino-card__foot">
          <div className="torino-card__price">
            {formatPrice(tour.price)} <span>تومان</span>
          </div>
          <Link href={`/tours/${tour.id}`} className="torino-card__btn">
            رزرو
          </Link>
        </div>
      </div>
    </article>
  );
}
