// types.ts

export interface TProduct {
  id: string;
  name: string;
  duration: number;
  price: number;
  businessId: string;
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
  phone: string;
  email: string;
  workingHours: string[];
  blockedHours: string[];
  products: TProduct[];
  bookings: TBooking[];
}
