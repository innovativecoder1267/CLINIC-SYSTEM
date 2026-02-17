import { AvailabilityModel } from "@/app/schemas/availaiblity.schema";
import { NextResponse } from "next/server";


export async function GET(){
      const data=await AvailabilityModel.find().select("startDate endDate Isavailaible")
      
    if(!data){
        return NextResponse.json({
        message:"Cant find the availablity"
        },{status:402})
    }
    return NextResponse.json({message:"Found the availaiblity of the doctor",data},{status:200})
}