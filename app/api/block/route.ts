import { NextRequest, NextResponse } from "next/server";
import addBlock from "@/actions/addBlock";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const updatedBusiness = await addBlock(body);

    console.log("[POST /api/block]", updatedBusiness);

    return NextResponse.json(updatedBusiness, { status: 201 });
  } catch (error) {
    console.error("[POST /api/property]", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}
