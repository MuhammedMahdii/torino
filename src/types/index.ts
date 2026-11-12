export type Place = {
  id: string;
  name: string;
};

export type Tour = {
  id: string;
  origin: Place;
  destination: Place;
  startDate: string;
  endDate: string;
  title: string;
  fleetVehicle: string;
  price: number;
  availableSeats: number;
  insurance: boolean | string;
  options: string[];
  image?: string;
};

export type AuthUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  mobile: string;
};

export type UserProfile = {
  id: string;
  mobile: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female";
  birthDate?: string;
  nationalCode?: string;
  payment?: {
    shaba_code?: string;
    debitCard_code?: string;
    accountIdentifier?: string;
  };
};

export type Transaction = {
  id: string;
  type?: string;
  amount: number;
  created_at?: string;
  createdAt?: string;
  date?: string;
};

export type Basket = {
  id?: string;
  userId?: string;
  tourId?: string;
  title?: string;
  price?: number;
  [key: string]: unknown;
};

export type OrderPayload = {
  nationalCode: string;
  fullName: string;
  gender: "male" | "female";
  birthDate: string;
};

export type TourFilters = {
  originId?: string;
  destinationId?: string;
  startDate?: string;
  endDate?: string;
};
