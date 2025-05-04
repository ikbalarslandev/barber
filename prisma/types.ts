import { Business, Location, Product, Booking } from "@prisma/client";

export interface TLocation extends Location {}

export interface TBusiness extends Business {
  location: TLocation;
  products: TProduct[];
  bookings: TBooking[];
}

export interface TProduct extends Product {}
export interface TBooking extends Booking {}

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
