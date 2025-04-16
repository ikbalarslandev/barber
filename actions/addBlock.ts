import prisma from "@/prisma";

interface TRequestBody {
  businessId: string;
  hour: string;
}
const addBlock = async (body: TRequestBody) => {
  const { businessId, hour } = body;

  const business = await prisma.business.findUnique({
    where: {
      id: businessId,
    },
  });

  const previousBlockeds = business?.blockedHours;
  const newBlockeds = previousBlockeds ? [...previousBlockeds, hour] : [hour];

  const updatedBusiness = await prisma.business.update({
    where: {
      id: businessId,
    },
    data: {
      blockedHours: newBlockeds,
    },
  });

  return updatedBusiness;
};
export default addBlock;
