import prisma from "@/prisma";

interface TRequestBody {
  c_phone: string;
  c_name: string;
  c_email: string;
  hour: string;
  productIds: string[];
  businessId: string;
}
const createBooking = async (requestBody: TRequestBody) => {
  const { c_phone, c_name, c_email, hour, productIds, businessId } =
    requestBody;

  console.log("Request Body:", requestBody);

  return requestBody;
};
export default createBooking;
