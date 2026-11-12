import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

const opts: Cookies.CookieAttributes = {
  expires: 7,
  sameSite: "lax",
  path: "/",
};

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY) || null;
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_KEY) || null;
}

export function setTokens(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, opts);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { ...opts, expires: 7 });
}

export function setAccessToken(accessToken: string) {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, opts);
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
}
