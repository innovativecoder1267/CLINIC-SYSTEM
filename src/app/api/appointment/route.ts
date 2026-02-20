import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import DbConnection from "@/lib/db/database";
import crypto from "crypto"
export async function POST(req:NextRequest){
    await DbConnection();
    console.log("Request recieved")
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature,checkuptype,selectedSlot,date,Description}=await req.json();
    console.log(razorpay_payment_id,razorpay_order_id,razorpay_signature);
    if(!razorpay_payment_id||!razorpay_order_id||!razorpay_signature||!checkuptype||!selectedSlot||!date){
      return NextResponse.json({message:"Cant receive the Payment response"},{status:402})
    }
    
    const body=razorpay_order_id+'|'+razorpay_payment_id

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

    if(expectedSignature!=razorpay_signature){
      return NextResponse.json({message:"Payment not verified"},{status:401})
    }

      const Token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
      })
      if (!Token||!Token._id) {
        return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
        );
    }
     const Userid=Token?._id
 

    const selectedDate=new Date(date)
    selectedDate.setHours(0,0,0,0)
    const today=new Date()
    today.setHours(0,0,0,0)
    const maxallowed=new Date(today)
    maxallowed.setDate(today.getDate()+15)
    if(maxallowed<selectedDate){
    return NextResponse.json(
    { message: "Appointments can only be booked up to 15 days in advance" },
    { status: 400 }
  );
    }
    if(today>selectedDate){
    return NextResponse.json(
    { message: "You cannot book an appointment in the past" },
    { status: 400 }
  );
    }
    const FindSlot=await AppointmentModel.findOne({
        date,
        slot_time:selectedSlot
    })
    if(FindSlot){
        return NextResponse.json({message:"Slot already exist"},{status:403})
    }
     await AppointmentModel.create({
        date:date,
        type:checkuptype,
        slot_time:selectedSlot,
        User_id:Userid,
        description:Description,
        status:"BOOKED",
        isBooked:true
    })   
    
    return NextResponse.json({message:"Appointment created"},{status:200})
}