import DatePage from "@/components/pages/date";
import prisma from "@/prisma";
import { TBusiness } from "@/prisma/types";

const Date = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const business = (await prisma.business.findUnique({
    where: {
      id,
    },
  })) as TBusiness | null;

  if (!business) {
    return <div>Business not found</div>;
  }

  return <DatePage business={business} />;
};

export default Date;
