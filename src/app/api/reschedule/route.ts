import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import DbConnection from "@/lib/db/database";
export async function POST(req:NextRequest) {
    await DbConnection();
    const {date,selectedSlot,checkuptype,Description,appointmentid}=await req.json()

    const Token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })        
    if(!Token||!Token._id){
       
        return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
        );
}
    const User_id=Token?._id
    if(!checkuptype||!selectedSlot||!date||!appointmentid){
        return NextResponse.json({message:"Cant receive the Payment response"},{status:402})
    }
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    const ChangeAppointment=await AppointmentModel.findOne({
        User_id,
        _id:appointmentid
    })
    if(!ChangeAppointment){
         return NextResponse.json(
        { message: "Appointment Cant reschedule because it is never booked" },
        { status: 400 }
        );
    }
    const selectedDate=new Date(date)
    selectedDate.setHours(0,0,0,0)
    const today=new Date()
    today.setHours(0,0,0,0)
    const maxallowed=new Date(today)
    maxallowed.setDate(today.getDate()+15)
     if(today>selectedDate){
    return NextResponse.json(
    { message: "You cannot book an appointment in the past" },
    { status: 400 }
  );
    }
    if(maxallowed<selectedDate){
    return NextResponse.json(
    { message: "Appointments can only be booked up to 15 days in advance" },
    { status: 400 }
  );
    }
    //otherwise change the object
    ChangeAppointment.date=date
    ChangeAppointment.type=checkuptype
    ChangeAppointment.slot_time=selectedSlot
    ChangeAppointment.description=Description
    await ChangeAppointment.save()

    return NextResponse.json({message:"Rescheduled your meeting"},{status:200})
}