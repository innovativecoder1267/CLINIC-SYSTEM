import { NextResponse } from "next/server";
import Razorpay from "razorpay";
 
//ordercreated
const razorpay=new Razorpay({
    key_id:process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}) 
export async function POST() {
    const order=await razorpay.orders.create({
        amount:50000,
        currency:"INR",
        receipt:`rcpt${Date.now()}`
    })
       return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
  });
}