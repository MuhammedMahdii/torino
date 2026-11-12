import api from "@/lib/axios";
import type { Tour, Transaction, UserProfile } from "@/types";

export async function getProfile() {
  const { data } = await api.get<UserProfile>("/user/profile");
  return data;
}

export async function updateProfile(payload: Partial<UserProfile>) {
  const { data } = await api.put("/user/profile", payload);
  return data as { message: string; user: UserProfile };
}

export async function getUserTours() {
  const { data } = await api.get<Tour[]>("/user/tours");
  return data;
}

export async function getUserTransactions() {
  const { data } = await api.get<Transaction[]>("/user/transactions");
  return data;
}
