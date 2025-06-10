"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import DrawerComponent from "../Drawer";
import { useState, useEffect } from "react";
import { TBusiness, TProduct } from "@/prisma/types";
import { CiLocationOn } from "react-icons/ci";
import DropdownComponent from "../dropdown";
import { GoDotFill } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Booking = ({ business }: { business: TBusiness }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const businessId = business.id;
    localStorage.setItem("businessId", businessId);

    const rwg_token = searchParams.get("rwg_token");
    if (rwg_token) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `rwg_token=${rwg_token}; expires=${expiryDate.toUTCString()}; path=/`;
    }

    // if productId is not in the URL console log it
    const productId = searchParams.get("productId");
    if (productId) {
      setIsOpen(true);
    }
  }, []);

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
      <h1 className="text-center text-xl font-bold mt-4 mx-4">
        {business?.name}
      </h1>
      <div className="flex items-center justify-center mt-2 mb-10 gap-1 mx-4">
        <CiLocationOn size={20} />
        <h5 className="text-xs">{business?.address}</h5>
      </div>

      <div className="flex flex-col gap-4 mx-3 mt-5">
        {business?.products.map((product: TProduct) => (
          <div className="flex  gap-2 border items-center justify-between rounded">
            <Accordion
              type="single"
              collapsible
              key={product.id}
              className="w-full m-0 p-0"
            >
              <AccordionItem
                className="flex flex-col items-center justify-between w-full "
                value={`item-${product.id}`}
              >
                <div className="flex items-center justify-between w-full px-2 py-1">
                  <div className="flex items-start flex-col">
                    <h2>{product.name}</h2>
                    <div className="flex text-xs gap-1">
                      <AccordionTrigger asChild className="p-0 m-0">
                        <button className="underline p-0 text-xs">
                          detaylar
                        </button>
                      </AccordionTrigger>
                      <GoDotFill size={7} className="my-auto" />
                      <p>
                        {product.price} {product.currency}
                      </p>
                    </div>
                  </div>
                  <FaAngleRight
                    className="p-1"
                    size={24}
                    onClick={() => handleProductClick(product)}
                  />
                </div>

                {/* Accordion content below the product box */}
                <AccordionContent className="px-2 pb-4 text-xs">
                  {product.desc}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
