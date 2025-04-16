"use client";

import { useState } from "react";
import { format, isBefore } from "date-fns";
import { tr } from "date-fns/locale";
import DateAlert from "@/components/Alert";
import { generateTimeSlots } from "@/lib/utils";
import { getIstanbulTime } from "@/lib/time";
import { TBusiness } from "@/prisma/types";

const DatePage = ({ business }: { business: TBusiness }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, close] = business.workingHours.slice(0, 2);

  const allSlots = generateTimeSlots(open, close, 30);

  const now = getIstanbulTime();

  // Filter only future time slots
  const timeSlots = allSlots.filter((slot) => {
    const blockedArr = business.blockedHours;
    if (blockedArr.includes(slot)) {
      return false;
    }

    const [hour, minute] = slot.split(":").map(Number);
    const slotTime = getIstanbulTime();
    slotTime.setHours(hour, minute, 0, 0);
    return !isBefore(slotTime, now);
  });

  const handleClick = (slot: string) => {
    setSelected(slot);
    setIsAlertOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        {format(getIstanbulTime(), "d MMMM", { locale: tr })}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleClick(slot)}
            className={`border px-4 py-2 rounded transition-all duration-150
              ${selected === slot ? "bg-black text-white" : "bg-white"}
            `}
          >
            {slot}
          </button>
        ))}
        <DateAlert
          selected={selected}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
        />
      </div>
    </div>
  );
};

export default DatePage;
