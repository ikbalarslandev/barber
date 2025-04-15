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
  date: string; // ISO string if coming from JSON, use Date if directly used as Date
  note?: string;
  c_name: string;
  c_phone: string;
  c_email: string;
  products: string[]; // array of product IDs
  businessId: string;
}

export interface TBusiness {
  id: string;
  name: string;
  phone: string;
  email: string;
  products: TProduct[];
  bookings: TBooking[];
}
