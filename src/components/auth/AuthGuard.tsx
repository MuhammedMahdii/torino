"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useAuthStore } from "@/store/authStore";
import { getAccessToken } from "@/lib/cookies";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { openLogin, hydrate } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrate();
    const token = getAccessToken();
    if (!token) {
      openLogin();
      router.replace("/");
      return;
    }
    setReady(true);
  }, [hydrate, openLogin, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <ThreeDots color="#28A745" height={50} width={70} />
      </div>
    );
  }

  return <>{children}</>;
}
