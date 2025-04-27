import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

type ProductInput = {
  name: string;
  duration?: number;
  price: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, coordinates, address, products } = body;

    const newBusiness = await prisma.business.create({
      data: {
        name,
        coordinates,
        address,
        products:
          products && products.length > 0
            ? {
                create: products.map((product: ProductInput) => ({
                  name: product.name,
                  duration: product.duration ?? 30,
                  price: product.price,
                })),
              }
            : undefined,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    console.error("[POST /api/property]", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}
