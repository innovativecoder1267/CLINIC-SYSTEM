import { UserModel } from "@/app/schemas/User.schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/mail/resend";
import DbConnection from "@/lib/db/database";
 

export  async function POST(req:Request){

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
    await DbConnection()
    const otp=generateOtp()
    const {username,email,PhoneNumber,password,Role}=await req.json();
    console.log(username,email,PhoneNumber,password,Role);
     if(!username||!email||!PhoneNumber||!password||!Role){
        return NextResponse.json({message:"Plz Fill all the details"},{status:401})
    }
    const FindUser=await UserModel.findOne({
        $or:[
        {email:email},
        {username:username}
    ]})
    if(FindUser){
        if(FindUser.isVerified){
            return  NextResponse.json({message:"User already exist"},{status:400})
        }
        const hashedotp=await bcrypt.hash(otp,10)
        FindUser.username=username
        FindUser.email=email
        FindUser.PhoneNumber=PhoneNumber
        const HashedPassword=await bcrypt.hash(password,10)
        FindUser.password=HashedPassword
        FindUser.VerificationCode=hashedotp
        await FindUser.save()
    }
    const HashedPassword=await bcrypt.hash(password,10)
    if(!FindUser){
        const HashedOtp=await bcrypt.hash(otp,10)
       await UserModel.create({
            username,
            email,
            password:HashedPassword,
            PhoneNumber,
            VerificationCode:HashedOtp,
            Role:Role,
            isVerified:false
        })
    }
 
    await  sendOtpEmail({otp,email})
    return NextResponse.json({message:"User registered successfully plz verify"},{status:201})

}

 