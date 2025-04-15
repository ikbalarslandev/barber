"use client";

import { useState } from "react";
import { format, addMinutes, isBefore } from "date-fns";
import { tr } from "date-fns/locale";

const generateTimeSlots = (start: string, end: string, interval = 30) => {
  const today = new Date();
  const slots = [];

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

const DatePage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const timeSlots = generateTimeSlots("07:30", "00:00", 30);

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-bold mb-4"></h1>
      <h1 className="text-xl font-bold mb-4 text-center">
        {format(new Date(), "d MMMM", { locale: tr })}
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelected(slot)}
            className={`border px-4 py-2 rounded ${
              selected === slot ? "bg-black text-white" : "bg-white"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-6 text-center font-medium">
          Selected Time: <span className="text-blue-600">{selected}</span>
        </p>
      )}
    </div>
  );
};

export default DatePage;
