import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import DbConnection from "@/lib/db/database";
 

 export async function GET(req:NextRequest){
    console.log('Here we go');
    const today=new Date()
    await DbConnection();

    const Token=await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!Token||!Token._id){
        return Response.json({message:"Session expired plz login again"},{status:401})
    }
    const User_id=Token._id
    const fetch = await AppointmentModel
    .find({ User_id,
    $or:[
        {date:{$gte:today}},
        {status:{$ne:"BOOKED"}}
    ]
   })
  .select("slot_time date type status")
  .sort({ date: 1 });    
  const past=await AppointmentModel.find({
    User_id,
   $or:[
    {date:{$lt:today}},
    {status:{$ne:"BOOKED"}}
   ] 
  }
)
    if(!fetch){
       return NextResponse.json({message:"Cant find the appointment for this user"},{status:403})
    }
    return NextResponse.json({message:"Data fetched successfully",fetch,past},{status:200})
}