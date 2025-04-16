import prisma from "@/prisma";
import { isBefore, setHours, setMinutes } from "date-fns";

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

  const dbBlockeds = business?.blockedHours;
  // if any blocked hours from the past are found, remove them

  const isSlotPast = (slot: string) => {
    const [hour, minute] = slot.split(":").map(Number);
    const slotDate = setMinutes(setHours(new Date(), hour), minute);
    return isBefore(slotDate, new Date());
  };

  const previousBlockeds = dbBlockeds?.filter((slot) => {
    if (isSlotPast(slot)) {
      return false;
    }
    return true;
  });
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
