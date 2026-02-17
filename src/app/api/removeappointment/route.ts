import { AppointmentModel } from "@/app/schemas/appointment.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {appointmentid}=await req.json()
    if(!appointmentid){
         return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
            );
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
         const Findappointment=await AppointmentModel.findByIdAndDelete({User_id:Userid,_id:appointmentid})
        if(!Findappointment){
              return NextResponse.json(
            { message: "Cant delete the appointment" },
            { status: 401 }
            );
        }
          return NextResponse.json(
            { message: "Appointment deleted successfully" },
            { status: 200 }
            );

}