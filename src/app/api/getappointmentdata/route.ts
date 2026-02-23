import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { NextResponse } from "next/server";
import DbConnection from "@/lib/db/database";

export async function GET() {
    await DbConnection();
     const Appointment=await AppointmentModel.find()
    .populate("User_id","username ")
    .select("slot_time status type User_id date")
     return NextResponse.json({message:"Data received",Appointment},{status:200})
}