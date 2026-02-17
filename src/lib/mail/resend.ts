 import { Resend } from "resend";
import "server-only";
if(!process.env.RESEND_EMAIL_SECRET){
  throw new Error("Not found secret ")
}
const resend = new Resend(process.env.RESEND_EMAIL_SECRET);

type SendOtpEmailParams = {
  email: string;
  otp: string;
};

export async function sendOtpEmail({
  email,
  otp,
}: SendOtpEmailParams) {
  const html = `
    <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:40px">
      <div style="max-width:480px; margin:auto; background:#ffffff; padding:24px; border-radius:8px">
        
        <h2 style="color:#111827; text-align:center">
          Verify your email
        </h2>

        <p style="color:#374151; font-size:14px">
          Use the OTP below to verify your email address.
          This code is valid for <strong>10 minutes</strong>.
        </p>

        <div style="
          margin:24px 0;
          padding:16px;
          text-align:center;
          font-size:26px;
          font-weight:bold;
          letter-spacing:6px;
          background:#f3f4f6;
          border-radius:6px;
          color:#111827;
        ">
          ${otp}
        </div>

        <p style="font-size:12px; color:#6b7280">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <p style="font-size:12px; color:#9ca3af; margin-top:20px">
          © ${new Date().getFullYear()} Your App
        </p>
      </div>
    </div>
  `;
  console.log(email,otp)

  try {
    await resend.emails.send({
    from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Your verification code",
      html,
    });
    console.log("Mail sent")
  } catch (error) {
    console.error("Resend OTP email failed:", error);
    throw new Error("Unable to send email");
  }
}
