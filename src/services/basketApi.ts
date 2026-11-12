import api from "@/lib/axios";
import type { Basket, OrderPayload } from "@/types";

export async function getBasket(): Promise<Basket | null> {
  try {
    const { data } = await api.get<Basket>("/basket");
    return data;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err &&
      "response" in err &&
      (err as { response?: { status?: number } }).response?.status === 404
    ) {
      return null;
    }
    throw err;
  }
}

export async function addToBasket(tourId: string) {
  const { data } = await api.put(`/basket/${tourId}`);
  return data;
}

export async function createOrder(payload: OrderPayload) {
  const { data } = await api.post("/order", payload);
  return data as { message: string };
}