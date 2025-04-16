import prisma from "@/prisma";

const getBusinessByEmail = async (email: string) => {
  try {
    const business = await prisma.business.findUnique({
      where: { email },
      include: {
        products: true,
        bookings: true,
      },
    });

    return business;
  } catch (error) {
    console.error("[getBusinessByEmail]", error);
    throw new Error("Failed to fetch business");
  }
};

export { getBusinessByEmail };
