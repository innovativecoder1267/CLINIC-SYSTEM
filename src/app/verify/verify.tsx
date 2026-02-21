"use client";
export const dynamic = "force-dynamic";
import axios from "axios";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [Otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
  const param = searchParams.get("email");
  setEmail(param);
}, [searchParams]);

  async function handleVerify() {
    if (!Otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/verify-otp", {
        email,
        Otp,
      });

      if (res.status === 201) {
        alert("Email verified successfully 🎉");
        router.push("/login"); // or /dashboard
      }
    } catch (err:any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            We’ve sent a 6-digit OTP to
          </p>
          <p className="text-sm font-medium text-blue-600 mt-1">
            {email}
          </p>
        </div>

        {/* OTP Input */}
        <input
          type="text"
          maxLength={7}
          value={Otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="
            w-full text-center tracking-[0.4em] text-xl
            px-4 py-3 border rounded-md
            text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">
            {error}
          </p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="
            w-full mt-6 py-3 rounded-md font-semibold text-white
            bg-blue-600 hover:bg-blue-700 transition
            disabled:opacity-50
          "
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Didn’t receive the code? Check spam or try again.
        </p>
      </div>
    </div>
  );
}
