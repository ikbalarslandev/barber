// types.ts

export interface TProduct {
  id: string;
  name: string;
  duration: number;
  currency: string;
  price: number;
  businessId: string;
  desc: string;
}

export interface TBooking {
  id: string;
  hour: string;
  note?: string;
  c_name: string;
  c_phone: string;
  c_email: string;
  products: string[];
  businessId: string;
  createdAt: Date;
}

export interface TBusiness {
  id: string;
  name: string;
  email: string;

  address: string;
  postalCode: string;

  workingHours: string[];
  blockedHours: string[];
  products: TProduct[];
  bookings: TBooking[];
}
