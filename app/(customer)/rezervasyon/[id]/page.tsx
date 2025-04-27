import { getProducts } from "@/actions/getProducts";
import Booking from "@/components/pages/booking";
import { TBusiness } from "@/prisma/types";
import { Metadata } from "next";

type BookingPageProps = {
  params: { id: string };
};

// Dynamic metadata
export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { id } = params;

  const business = (await getProducts(id)) as TBusiness | null;

  if (!business) {
    return {
      title: "Hamampass - Not Found",
      description: "Business not found",
    };
  }

  return {
    title: `Hamampass - ${business.name}`,
    description: `Booking page for ${business.name}`,
  };
}

const BookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const business = (await getProducts(id)) as TBusiness | null;
  if (!business) {
    return <div>Business not found</div>;
  }
  return <Booking business={business} />;
};

export default BookingPage;
