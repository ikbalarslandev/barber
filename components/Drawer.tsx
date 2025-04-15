"use client";
import { useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const DrawerComponent = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());

  const existingProductIds = current.getAll("productId");

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <div className="flex flex-col gap-2">
            {existingProductIds.map((productId) => (
              <p key={productId}>Product ID: {productId}</p>
            ))}
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="border rounded-lg py-2 bg-gray-600 text-white">
            Sonraki
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
