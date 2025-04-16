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
  const isExists = previousBlockeds?.includes(hour);

  if (!previousBlockeds && !isExists) {
    throw new Error("No blocked hours found");
  }
  const newBlockeds = isExists
    ? previousBlockeds?.filter((blockedHour) => blockedHour !== hour)
    : [...(previousBlockeds || []), hour];

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
