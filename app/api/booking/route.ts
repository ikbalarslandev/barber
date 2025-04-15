import { NextRequest, NextResponse } from "next/server";
import createBooking from "@/actions/createBooking";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const booking = await createBooking(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("[POST /api/property]", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}
