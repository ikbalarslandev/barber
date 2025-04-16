import prisma from "@/prisma";

interface TRequestBody {
  c_phone: string;
  c_name: string;
  c_email: string;
  hour: string;
  productIds: string[];
  businessId: string;
}
const createBooking = async (body: TRequestBody) => {
  const { c_phone, c_name, c_email, hour, productIds, businessId } = body;

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const booking = await prisma.booking.create({
    data: {
      c_phone,
      c_name,
      c_email,
      hour,
      businessId,
      products: products.map((product) => product.name),
    },
  });

  console.log("Booking created", booking);

  return booking;
};
export default createBooking;
