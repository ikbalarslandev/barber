import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TBooking } from "@/prisma/types";
import { request } from "@/services/axios";
import { isBefore, setHours, setMinutes } from "date-fns";
import { IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { getIstanbulTime } from "@/lib/time";

const OwnerAlert = ({
  isAlertOpen,
  setIsAlertOpen,
  selected,
  isBlocked,
  setBlockedHours,
  bookingsForSelected,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
  selected: string | null;
  isBlocked?: boolean;
  setBlockedHours: React.Dispatch<React.SetStateAction<string[]>>;
  bookingsForSelected: TBooking[];
}) => {
  const handleSubmit = async () => {
    if (!selected) return;

    try {
      await request({
        type: "post",
        endpoint: "block",
        payload: {
          businessId: localStorage.getItem("businessId"),
          hour: selected,
        },
      });

      setBlockedHours(
        (prev) =>
          isBlocked
            ? prev.filter((hour) => hour !== selected) // unblock
            : [...prev, selected] // block
      );

      setIsAlertOpen(false);
    } catch (error) {
      console.error("Failed to update blocked hour:", error);
    }
  };

  const isSlotPast = () => {
    const slot = selected || "";
    const [hour, minute] = slot.split(":").map(Number);
    const slotDate = setMinutes(setHours(getIstanbulTime(), hour), minute);
    return isBefore(slotDate, getIstanbulTime());
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selected} </AlertDialogTitle>
        </AlertDialogHeader>

        {bookingsForSelected.length > 0 &&
          bookingsForSelected.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col justify-between items-start border rounded p-1 shadow"
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="font-bold">{booking.customer.name}</h3>
                <div className="flex gap-6">
                  <IoCallOutline
                    size={20}
                    onClick={() => window.open(`tel:${booking.customer.phone}`)}
                  />
                  <FaWhatsapp
                    size={20}
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send?phone=${booking.customer.phone}`
                      )
                    }
                  />
                </div>
              </div>

              <ul>
                {booking.products.map((product) => (
                  <li key={product} className="text-sm">
                    - {product}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {!isSlotPast() && (
          <AlertDialogAction
            onClick={handleSubmit}
            className="bg-gray-600 mt-5"
          >
            {isBlocked
              ? "Bu Saati Rezervasyona Aç"
              : "Bu Saatte Rezervasyon Alma"}
          </AlertDialogAction>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-600">
            Kapat
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OwnerAlert;
