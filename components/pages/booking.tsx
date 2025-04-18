"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import DrawerComponent from "../Drawer";
import { useState, useEffect } from "react";
import { TBusiness, TProduct } from "@/prisma/types";

const Booking = ({ business }: { business: TBusiness }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const businessId = business.id;
    localStorage.setItem("businessId", businessId);
  }, [business]);

  const [isOpen, setIsOpen] = useState(false);

  const handleProductClick = (product: TProduct) => {
    const current = new URLSearchParams(searchParams.toString());
    const id = product.id.toString();

    const existingProductIds = current.getAll("productId");

    if (!existingProductIds.includes(id)) {
      current.append("productId", id);
      router.replace(`?${current.toString()}`, { scroll: false });
    }

    setIsOpen(true);
  };

  return (
    <main>
      <h1 className="text-center text-xl font-bold mt-4">{business?.name}</h1>
      <div className="flex flex-col gap-4 mx-3 mt-5">
        {business?.products.map((product: TProduct) => (
          <button
            key={product.id}
            className="flex gap-2 border items-center justify-between px-5 py-2 rounded"
            onClick={() => handleProductClick(product)}
          >
            <div className="flex gap-2 items-center">
              <h2>{product.name}</h2>
              <p className="text-sm">({product.price} TL)</p>
            </div>
            <CiCirclePlus />
          </button>
        ))}
      </div>

      <DrawerComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        products={business.products}
      />
    </main>
  );
};

export default Booking;
