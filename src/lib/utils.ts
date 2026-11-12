import { PLACE_LABEL } from "./constants";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export function placeName(name?: string) {
  if (!name) return "";
  return PLACE_LABEL[name] || name;
}

export function toFaDigits(value: string | number) {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** Display phones / IDs with Persian digits and stable LTR order. */
export function formatPhone(value?: string | null) {
  if (!value) return "—";
  return toFaDigits(value);
}

export function vehicleLabel(v?: string) {
  if (!v) return "—";
  const map: Record<string, string> = {
    bus: "اتوبوس",
    van: "ون",
    suv: "شاسی بلند",
    airplane: "پرواز",
    plane: "پرواز",
    flight: "پرواز",
    train: "قطار",
    ship: "کشتی",
  };
  return map[v.toLowerCase()] || v;
}

export function dayDiff(start?: string, end?: string) {
  if (!start || !end) return 0;
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

export function apiImage(path?: string) {
  if (!path) return "/images/tour-placeholder.svg";
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6500";
  return `${base}${path}`;
}
