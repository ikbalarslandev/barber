import { getProducts } from "@/actions/getProducts";
import Booking from "@/components/pages/booking";

const BookingPage = async ({ params }: any) => {
  let { id } = await params;
  const business = await getProducts(id);

  return <Booking business={business} />;
};

export default BookingPage;
