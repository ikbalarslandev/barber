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
import { useRouter } from "next/navigation";

const DateAlert = ({
  isAlertOpen,
  setIsAlertOpen,
  selected,
}: {
  isAlertOpen: boolean;
  setIsAlertOpen: (isOpen: boolean) => void;
  selected: string | null;
}) => {
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem("selectedHour", selected || "");
    router.push("/contact");
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Devam etmek istiyor musunuz? </AlertDialogTitle>
          <AlertDialogDescription>
            {selected} saatini seçtiniz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hayır</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Evet</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DateAlert;
