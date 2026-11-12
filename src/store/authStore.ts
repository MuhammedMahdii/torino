import { create } from "zustand";
import type { AuthUser } from "@/types";
import { clearTokens, getAccessToken } from "@/lib/cookies";

type AuthState = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loginOpen: boolean;
  setUser: (user: AuthUser | null) => void;
  openLogin: () => void;
  closeLogin: () => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loginOpen: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),
  logout: () => {
    clearTokens();
    set({ user: null, isLoggedIn: false });
  },
  hydrate: () => {
    const token = getAccessToken();
    set({ isLoggedIn: !!token });
  },
}));
