import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { NextResponse } from "next/server";
import DbConnection from "@/lib/db/database";
export async function POST(req:Request) {
    await DbConnection();
    const {date}=await req.json();
    console.log(date);
    if(!date){
        return NextResponse.json({message:"Date not recieved"},{status:401})
    }
    const Find=await AppointmentModel.find(
        {
        date:date,
        status:"BOOKED"
    }).select("date slot_time")
    if(!Find){
       return NextResponse.json({message:"Date not recieved"},{status:403})
    }
    return NextResponse.json({data:Find},{status:200})
}