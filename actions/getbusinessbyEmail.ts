import prisma from "@/prisma";

const getBusinessByEmail = async (email: string) => {
  try {
    const business = await prisma.business.findUnique({
      where: { email },
    });

    return business;
  } catch (error) {
    console.error("[getBusinessByEmail]", error);
    throw new Error("Failed to fetch business");
  }
};

export { getBusinessByEmail };
