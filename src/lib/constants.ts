export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6500";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const PLACES = [
  { id: "1", name: "Tehran", label: "تهران" },
  { id: "2", name: "Sanandaj", label: "سنندج" },
  { id: "3", name: "Madrid", label: "مادرید" },
  { id: "4", name: "Isfahan", label: "اصفهان" },
  { id: "5", name: "Sulaymaniyah", label: "سلیمانیه" },
  { id: "6", name: "Hewler", label: "هولر" },
  { id: "7", name: "Mazandaran", label: "مازندران" },
  { id: "8", name: "Offroad", label: "آفرود" },
  { id: "9", name: "Italy", label: "ایتالیا" },
];

export const PLACE_LABEL: Record<string, string> = {
  ...Object.fromEntries(PLACES.map((p) => [p.name, p.label])),
  Sananndaj: "سنندج",
};

export const SUPPORT_PHONE = "021-1840";
export const FOOTER_PHONE = "021-8574";
