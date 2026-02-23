"use client";
import { useState } from "react";
import Link from "next/link";
 import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 export default function Login() {
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [error,seterror]=useState("")
  const [email,setemali]=useState("")
  const [password,setpassword]=useState("")
  const {data:session,status}=useSession()
  const Router=useRouter()
  console.log("Session is ",session?.user);
  async function HandleLogin(e:React.FormEvent) {
   e.preventDefault();
   seterror("")
    console.log("LOGIN DATA:", {
    email,
    password,
    role,
  });
 

    
     const res=await signIn("credentials",{
     email,
     password,
     role,
     redirect:false,
  })
  console.log("Response is ",res);
  if(res?.ok){
    alert("User logged in")
    console.log("Response is",res)
    console.log("Session is",session)
     if(role=="ADMIN"){
    Router.replace("/admindashboard")
  }
  else{
    Router.replace("/userdashboard")
  }
  }
  if(res?.status===401){
    alert("Wrong Information entered or Trying to access the wrong portal")
  }
   } 
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Login to ClinicFlow
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Access your dashboard securely
          </p>
        </div>

        {/* ROLE SELECT */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Login as
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`flex-1 py-2 rounded-md border text-sm font-medium transition ${
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
              className={`flex-1 py-2 rounded-md border text-sm font-medium transition ${
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
        <form onClick={HandleLogin} className="space-y-4 text-black">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium  ">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e)=>setemali(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e)=>setpassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
              <p>
                {error}
              </p>
          {/* ROLE INFO */}
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md border">
            {role === "ADMIN" ? (
              <p>
                You are logging in as an <strong>Admin</strong>. You’ll have access
                to clinic management, schedules, and reports.
              </p>
            ) : (
              <p>
                You are logging in as a <strong>User</strong>. You can book and
                manage your appointments.
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href={"/sign-up"}> 
          <span className="text-blue-600 font-medium cursor-pointer">
            Register
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
