import { AppointmentModel } from "@/app/schemas/appointment.schema";
import DbConnection from "@/lib/db/database";
import { NextResponse } from "next/server";

export  async function GET(){
    await DbConnection();
    const startdate=new Date();
    startdate.setHours(0,0,0,0)

    const enddate=new Date();
    enddate.setHours(23,59,59,59)
    const todaybookings=await AppointmentModel.find({
        date:{
            $gte: startdate,
            $lte: enddate
        }
    })
    console.log(todaybookings);
    const availaibleslots=todaybookings.filter(slot => slot.status==="BOOKED").length
    const completedslots=todaybookings.filter(slot => slot.status==="COMPLETED" ).length

    return NextResponse.json({message:"All slots",
        todaybookings,
        availaibleslots,
        completedslots
    },{status:200})
}