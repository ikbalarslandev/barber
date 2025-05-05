import { Business, Location, Product, Booking, Customer } from "@prisma/client";

export interface TLocation extends Location {}
export interface TCustomer extends Customer {}

export interface TBusiness extends Business {
  products: TProduct[];
  location: TLocation;
  bookings: TBooking[];
}

export interface TProduct extends Product {}
export interface TBooking extends Booking {
  customer: TCustomer;
}

// export interface TProduct {
//   id: string;
//   name: string;
//   duration: number;
//   currency: string;
//   price: number;
//   businessId: string;
// }

// export interface TBooking {
//   id: string;
//   hour: string;
//   note?: string;
//   c_name: string;
//   c_phone: string;
//   c_email: string;
//   products: string[];
//   businessId: string;
//   createdAt: Date;
// }
