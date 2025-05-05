import prisma from "@/prisma";
import { TBusiness } from "@/prisma/types";

const getBusinessByEmail = async (email: string) => {
  try {
    const business = await prisma.business.findUnique({
      where: { email },
      include: {
        products: true,
        bookings: {
          include: {
            customer: true,
          },
        },
        location: true,
      },
    });

    return business as TBusiness;
  } catch (error) {
    console.error("[getBusinessByEmail]", error);
    throw new Error("Failed to fetch business");
  }
};

export { getBusinessByEmail };
