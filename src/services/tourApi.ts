import api from "@/lib/axios";
import type { Tour, TourFilters } from "@/types";

export async function getTours(filters: TourFilters = {}) {
  const { data } = await api.get<Tour[]>("/tour", { params: filters });
  return data;
}

export async function getTour(id: string) {
  const { data } = await api.get<Tour>(`/tour/${id}`);
  return data;
}
