import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { request } from "@/services/axios";

const OwnerAlert = ({
  isAlertOpen,
  setIsAlertOpen,
  selected,
  isBlocked,
  setBlockedHours,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
  selected: string | null;
  isBlocked?: boolean;
  setBlockedHours: React.Dispatch<React.SetStateAction<string[]>>;
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

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selected} </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogAction onClick={handleSubmit} className="bg-gray-600">
          {isBlocked
            ? "Bu Saati Rezervasyona Aç"
            : "Bu Saatte Rezervasyon Alma"}
        </AlertDialogAction>

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
