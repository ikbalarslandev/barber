import prisma from "@/prisma";

const getProducts = async (id: string) => {
  try {
    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    return business;
  } catch (error) {
    console.error("[getBusinessByEmail]", error);
    throw new Error("Failed to fetch business");
  }
};

export { getProducts };
