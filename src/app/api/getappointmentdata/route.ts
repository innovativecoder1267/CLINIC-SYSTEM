import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { NextResponse } from "next/server";


export async function GET() {
    
    const Appointment=await AppointmentModel.find()
    .populate("User_id","username ")
    .select("slot_time status type User_id date")

    return NextResponse.json({message:"Data received",Appointment},{status:200})
}