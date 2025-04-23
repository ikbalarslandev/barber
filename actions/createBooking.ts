import prisma from "@/prisma";
import { rwg_request } from "@/services/axios";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  const token = cookieStore.get("rwg_token")?.value;

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

  await rwg_request({
    endpoint: "debug/collect",
    token,
  })
    .then((response) =>
      console.log(
        "reserve with google token send",
        response.status,
        "token",
        token
      )
    )
    .catch((error) =>
      console.log("reserve with google token error", error, "token", token)
    );

  console.log("Booking created", booking);

  return booking;
};
export default createBooking;
