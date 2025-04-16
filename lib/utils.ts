import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addMinutes, isBefore } from "date-fns";
import { getIstanbulTime } from "./time";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTimeSlots = (
  start: string,
  end: string,
  interval = 30
) => {
  const today = getIstanbulTime();
  const slots: string[] = [];

  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  let current = new Date(today.setHours(startHour, startMin, 0, 0));
  const endTime = new Date(
    today.setHours(endHour === 0 ? 24 : endHour, endMin, 0, 0)
  );

  while (isBefore(current, endTime)) {
    slots.push(format(current, "HH:mm"));
    current = addMinutes(current, interval);
  }

  return slots;
};
