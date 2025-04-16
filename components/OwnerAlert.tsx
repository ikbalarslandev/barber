import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { request } from "@/services/axios";

const OwnerAlert = ({
  isAlertOpen,
  setIsAlertOpen,
  selected,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
  selected: string | null;
}) => {
  const handleSubmit = () => {
    request({
      type: "post",
      endpoint: "block",
      payload: {
        businessId: localStorage.getItem("businessId"),
        hour: selected,
      },
    });
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selected} </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogAction onClick={handleSubmit} className="bg-gray-600">
          Bu Saatte Rezervasyon Alma
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
