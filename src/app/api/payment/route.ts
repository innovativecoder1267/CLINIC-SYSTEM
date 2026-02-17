import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST() {
  const order = await razorpay.orders.create({
    amount: 50000, // ₹500 (in paise)
    currency: "INR",
    receipt: `appt_${Date.now()}`,
  });

  return NextResponse.json({order},{status:200});
}                           