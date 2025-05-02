"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FaTrashAlt } from "react-icons/fa";
import { TProduct } from "@/prisma/types";
const DrawerComponent = ({
  isOpen,
  setIsOpen,
  products,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  products: TProduct[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());

  const existingProductIds = current.getAll("productId");

  const existingProducts = products.filter((product) =>
    existingProductIds.includes(product.id.toString())
  );

  const handleDelete = (product: TProduct) => {
    const current = new URLSearchParams(searchParams.toString());
    const id = product.id.toString();

    const existingProductIds = current.getAll("productId");

    current.delete("productId", id);
    router.replace(`?${current.toString()}`, { scroll: false });
    if (existingProductIds.length === 1) {
      setIsOpen(false);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("productIds", JSON.stringify(existingProductIds));
    router.push(`/date/${localStorage.getItem("businessId")}`);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 mx-2">
          {existingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b"
            >
              <div className="flex gap-2 items-center ">
                <h2>{product.name}</h2>
                <p className="text-sm">
                  ({product.price} {product.currency})
                </p>
              </div>

              <FaTrashAlt
                className="text-red-500"
                onClick={() => handleDelete(product)}
              />
            </div>
          ))}
        </div>

        {/* sum */}
        <div className="flex justify-between  mt-5 px-2">
          <h2 className="font-bold">Toplam</h2>
          <p className="font-bold">
            {existingProducts.reduce((acc, product) => acc + product.price, 0)}{" "}
            {products[0].currency}
          </p>
        </div>

        <DrawerFooter>
          <DrawerClose
            onClick={handleSubmit}
            className="border rounded-lg py-2 bg-gray-600 text-white"
          >
            Sonraki
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
