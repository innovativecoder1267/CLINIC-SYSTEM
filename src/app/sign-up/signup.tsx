"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [email, setEmail] = useState("");
  const [Phoneno, setPhonenumber] = useState("");
  const [Password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function HandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const MakeReq = await axios.post("/api/signup", {
        username,
        email,
        PhoneNumber: Phoneno,
        password: Password,
        Role: role,
      });

      if (MakeReq.status === 201) {
        router.push(`/verify?email=${email}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Register to manage clinic operations digitally
          </p>
        </div>

        {/* ROLE SELECTION */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Registering as
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`flex-1 py-2 rounded-md border text-sm font-medium ${
                role === "USER"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              className={`flex-1 py-2 rounded-md border text-sm font-medium ${
                role === "ADMIN"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={HandleSubmit} className="space-y-4 text-black">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="number"
            placeholder="Phone number"
            value={Phoneno}
            onChange={(e) => setPhonenumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
