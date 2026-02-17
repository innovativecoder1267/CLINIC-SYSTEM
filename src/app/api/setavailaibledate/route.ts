import  {AvailabilityModel}  from "@/app/schemas/availaiblity.schema";
import DbConnection from "@/lib/db/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DbConnection();

  const { startdate, endDate } = await req.json();

  if (!startdate || !endDate) {
    return NextResponse.json(
      { message: "Start date and end date are required" },
      { status: 400 }
    );
  }

  const start = new Date(startdate);
  const end = new Date(endDate);
  const today = new Date();

  if (start < today || end < today) {
    return NextResponse.json(
      { message: "Dates cannot be in the past" },
      { status: 403 }
    );
  }

  if (start > end) {
    return NextResponse.json(
      { message: "Start date cannot be after end date" },
      { status: 422 }
    );
  }

  await AvailabilityModel.create({
    startDate: start,
    endDate: end,
    Isavailaible:false
  });

  return NextResponse.json(
    { message: "Unavailable dates saved successfully" },
    { status: 200 }
  );
}
