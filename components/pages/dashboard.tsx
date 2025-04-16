"use client";

import { useState } from "react";
import { format, isBefore, setHours, setMinutes, isSameDay } from "date-fns";
import { is, tr } from "date-fns/locale";
import OwnerAlert from "@/components/OwnerAlert";
import { generateTimeSlots } from "@/lib/utils";
import { TBusiness } from "@/prisma/types";

const DashBoardPage = ({ business }: { business: TBusiness }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [blockedHours, setBlockedHours] = useState(business.blockedHours);

  const [startHour, endHour] = business.workingHours.slice(0, 2);
  const timeSlots = generateTimeSlots(startHour, endHour, 30);
  const now = new Date();

  const bookingsForToday = business.bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    return isSameDay(bookingDate, now);
  });

  const handleClick = (slot: string) => {
    setSelected(slot);
    setIsAlertOpen(true);
  };

  const isSlotPast = (slot: string) => {
    const [hour, minute] = slot.split(":").map(Number);
    const slotDate = setMinutes(setHours(new Date(), hour), minute);
    return isBefore(slotDate, now);
  };

  const bookingsForSelected = bookingsForToday.filter(
    (booking) => booking.hour === selected
  );

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold text-center">{business.name}</h2>
      <h1 className="font-bold mb-4 text-center">
        {format(new Date(), "d MMMM", { locale: tr })}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot) => {
          const disabled = isSlotPast(slot);
          const isBooked = bookingsForToday.some((b) => b.hour === slot);
          const isBlocked = blockedHours.includes(slot);

          return (
            <button
              key={slot}
              onClick={() => (isBooked || !disabled) && handleClick(slot)}
              disabled={isBooked || isBlocked ? false : disabled}
              className={`border px-4 py-2 rounded transition-all duration-150
                ${
                  isBlocked
                    ? `bg-blue-100 text-gray-400 ${
                        isBooked && "border-gray-700"
                      }`
                    : disabled
                    ? `bg-gray-50 text-gray-400 cursor-not-allowed ${
                        isBooked && "border-gray-700"
                      }`
                    : `bg-white ${isBooked && "border-gray-700"}`
                }
              `}
            >
              {slot}
            </button>
          );
        })}

        <OwnerAlert
          isBlocked={blockedHours.includes(selected || "")}
          selected={selected}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          setBlockedHours={setBlockedHours}
          bookingsForSelected={bookingsForSelected}
        />
      </div>
    </div>
  );
};

export default DashBoardPage;
