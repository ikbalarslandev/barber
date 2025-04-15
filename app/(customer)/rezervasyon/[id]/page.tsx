import { getProducts } from "@/actions/getProducts";
import Booking from "@/components/pages/booking";
import { TBusiness } from "@/prisma/types";

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const business = (await getProducts(id)) as TBusiness;

  return <Booking business={business} />;
};

export default BookingPage;
