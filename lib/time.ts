// lib/time.ts
import { toZonedTime } from "date-fns-tz";

const timeZone = "Europe/Istanbul";

export const getIstanbulTime = () => {
  return toZonedTime(new Date(), timeZone);
};
