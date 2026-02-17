import { UserModel } from "@/app/schemas/User.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export  async function POST(req:Request) {
    const {email,Otp}=await req.json()
    console.log("Email came and otp came",email,Otp)
    if(!email||!Otp){
        return NextResponse.json({message:"Invalid credentials"},{status:401})
    }
    const User=await UserModel.findOne({email})
    if(!User){
        return NextResponse.json({message:"Cant Find the user"},{status:400})
    }
   const Compare=await bcrypt.compare(Otp,User.VerificationCode)
   if(!Compare){
    return NextResponse.json({message:"Otp is incorrect"},{status:403})
   }
   User.isVerified=true
   await User.save()

   return NextResponse.json({
    message:"User verified success"
   },{status:201})
}