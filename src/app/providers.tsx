"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/store/authStore";
import { getProfile } from "@/services/userApi";
import { getAccessToken } from "@/lib/cookies";
import LoginModal from "@/components/auth/LoginModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  const hydrate = useAuthStore((s) => s.hydrate);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    hydrate();
    const token = getAccessToken();
    if (token) {
      getProfile()
        .then((p) =>
          setUser({
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            mobile: p.mobile,
          }),
        )
        .catch(() => {});
    }

    const onLogout = () => logout();
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, [hydrate, setUser, logout]);

  return (
    <QueryClientProvider client={client}>
      {children}
      <LoginModal />
      <ToastContainer position="top-center" autoClose={3000} rtl theme="colored" />
    </QueryClientProvider>
  );
}
