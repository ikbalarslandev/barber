"use client";

import { useState } from "react";
import { format, isBefore, setHours, setMinutes, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import DateAlert from "@/components/Alert";
import { generateTimeSlots } from "@/lib/utils";
import { TBusiness } from "@/prisma/types";

const DashBoardPage = ({ business }: { business: TBusiness }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const timeSlots = generateTimeSlots("07:30", "00:00", 30);
  const now = new Date();

  const bookingsForToday = business.bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return isSameDay(bookingDate, now);
  });

  const handleClick = (slot: string) => {
    setSelected(slot);
    setIsAlertOpen(true);
    console.log("products", bookingsForToday);
  };

  const isSlotPast = (slot: string) => {
    const [hour, minute] = slot.split(":").map(Number);
    const slotDate = setMinutes(setHours(new Date(), hour), minute);
    return isBefore(slotDate, now);
  };

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold text-center">{business.name}</h2>
      <h1 className="font-bold mb-4 text-center">
        {format(new Date(), "d MMMM", { locale: tr })}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot) => {
          const disabled = isSlotPast(slot);

          return (
            <button
              key={slot}
              onClick={() => !disabled && handleClick(slot)}
              disabled={disabled}
              className={`border px-4 py-2 rounded transition-all duration-150
                ${
                  disabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : selected === slot
                    ? "bg-black text-white"
                    : "bg-white"
                }
              `}
            >
              {slot}
            </button>
          );
        })}
        <DateAlert
          selected={selected}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
        />
      </div>
    </div>
  );
};

export default DashBoardPage;
