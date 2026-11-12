"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { getTours } from "@/services/tourApi";
import TourCard from "@/components/tours/TourCard";

export default function TourList() {
  const params = useSearchParams();
  const filters = {
    originId: params.get("originId") || undefined,
    destinationId: params.get("destinationId") || undefined,
    startDate: params.get("startDate") || undefined,
    endDate: params.get("endDate") || undefined,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tours", filters],
    queryFn: () => getTours(filters),
  });

  return (
    <section id="tours" className="torino-page torino-gutter mt-12 md:mt-14">
      <h2 className="torino-tours-title">همه تور ها</h2>

      {isLoading && (
        <div className="flex justify-center py-16">
          <ThreeDots color="#28A745" height={50} width={70} />
        </div>
      )}

      {isError && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-danger">
          دریافت تورها با مشکل مواجه شد. مطمئن شوید API در حال اجراست.
        </p>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-soft">
          توری با این مشخصات پیدا نشد.
        </p>
      )}

      <div className="torino-tour-grid">
        {data?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
