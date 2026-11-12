import api from "@/lib/axios";
import type { AuthUser } from "@/types";

export async function sendOtp(mobile: string) {
  const { data } = await api.post("/auth/send-otp", { mobile });
  return data as { message: string; code?: string };
}

export async function checkOtp(mobile: string, code: string) {
  const { data } = await api.post("/auth/check-otp", { mobile, code });
  return data as {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}
