"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Router, User } from "lucide-react";
import BookAppointmentModal from "../confirmbooking/page";
import Reschedule from "../reschedule/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

 
 export default function UserDashboard() {
  type Appointment = {
  _id: string;
  date: string;
  slot_time: string;
  type: string;
  status: string;
};
   const [pastAppointment,setpastappointment]=useState<Appointment[]>([])
  const [AppointmentInfo,setAppointmentinfo]=useState<Appointment[]>([])
  const [open,setopen]=useState(false)
  const [startdate,setstartdate]=useState<string>("")
  const [endDate,setendDate]=useState<string>("")
  const [available,setavailable]=useState(false)
  const {data:session,status}=useSession()
   if(status==="loading")<p>Loading User...</p>
   
   if(!session.user.Role!=="ADMIN"){
    redirect("/")
   } 
    if(session.user.Role!=="USER"){
      redirect("/")
    }
  const Username=session?.user.username

   useEffect(()=>{
    async function Getavalaiblity(){
    try {
      const res=await axios.get("/api/getavailablity")
      console.log("Data is",res);
      if(res.status===200){
        if(res.data.data[0].endDate.length===0||res.data.data[0].startDate.length===0)return
        setavailable(true)
        setstartdate(res.data.data[0].startDate)
        setendDate(res.data.data[0].endDate)
      }
    } catch (error) {
      console.log("Error is",error);
    }
  }
  Getavalaiblity();
   },[]) 
  useEffect(()=>{
    async function Handledata() {
    try {
      const res=await axios.get("/api/getappointmentinfo")
      if(res.status===200){
        setAppointmentinfo(res.data.fetch)
        setpastappointment(res.data.past)
        console.log(res.data.past);

      }
    }
      catch (error) {
      console.log("Error is",error);
    }  
    }
    Handledata();
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-semibold">
          📅 <span>ClinicFlow</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <User className="w-5 h-5" />
          {session?.user.username}
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {Username}</h1>
          <p className="text-muted-foreground">
            Manage your appointments and book new ones
          </p>
        </div>
        {available && (
       <Card className="border-yellow-400 bg-yellow-50">
        <CardContent className="flex items-center gap-3 py-4">
          <div>
           
              <p>Doctor is not availaible on {startdate} to {endDate}</p>
            
          </div>
        </CardContent>
      </Card>
     )} 
        {/* BLUE CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-semibold">Need to see the doctor?</h2>
            <p className="text-sm opacity-90">
              Book an appointment based on available time slots
            </p>
          </div>

          <Button onClick={()=>setopen(true)} className="bg-white text-blue-600 hover:bg-gray-100">
            + Book New Appointment
          </Button>
        </div>
       <BookAppointmentModal 
       isOpen={open}
       isClose={()=>setopen(false)}
       />

    
        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* UPCOMING */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                UPCOMING
              </p>

              {/* APPOINTMENT CARD */}
           {AppointmentInfo?.length > 0 ? (
            AppointmentInfo.map((value) => (
            <AppointmentCard 
            key={value._id}
            id={value._id}
            date={value.date}
            time={value.slot_time}
            type={value.type}
            status={value.status}
            doctor="Dr anjali mehta"
      />
            ))
    ) : (
    <div className="text-sm text-muted-foreground">
        No appointments found
      </div>
    )}      
            </div>

            {/* PAST */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                PAST APPOINTMENTS
              </p>

               {pastAppointment.length>0 ?  (
                pastAppointment.map((value)=>(
                <PastAppointment
                date={value.date}
                key={value._id}
                time={value.slot_time}
                status={value.status}
                type={value.type}
              
                />
                ))
               ):(
                <div>
                  <p>No past appointments found</p>
                </div>
               )}

         
            </div>
          </CardContent>
        </Card>

        {/* INFO BOX */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="font-medium mb-3 text-blue-700">
            Important Information
          </p>

          <ul className="text-sm space-y-2 text-blue-700">
            <li>• Appointments can be cancelled up to 24 hours in advance</li>
            <li>• Please arrive 10 minutes before your scheduled time</li>
            <li>• Clinic hours: Monday to Saturday, 9:00 AM - 6:00 PM</li>
            <li>• For emergencies, please call +91 98765 00000</li>
            <li>• Bring previous medical records for first visits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function AppointmentCard({
  date,
  time,
  doctor,
  type,
  status,
  highlighted,
  id
}: any) {
  const[reschedule,setReschedule]=useState(false)
  const [sure,setsure]=useState(false)

  async function handleremove() {
    try {
     const res= await axios.post("api/removeappointment",{
       appointmentid:id
      })
      if(res.status===200){
        alert("Appointment removed refund will be initiated in 7 days")
        setsure(false)
      }
    } catch (error) {
      console.log("Error is",error) 
    }
  }

  return (
    <div
      className={`border rounded-xl p-5 mb-4 ${
        highlighted ? "border-blue-400 bg-blue-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold">{date}</p>
        <Badge variant="outline" className="text-blue-600 border-blue-300">
          <Calendar className="w-4 h-4 mr-1" /> {status}
        </Badge>
      </div>

      <div className="mt-2 text-sm text-muted-foreground space-y-1">
        <p className="flex items-center gap-2">
          <Clock className="w-4 h-4" /> {time}
        </p>
        <p>👩‍⚕️ {doctor}</p>
        <p>Type: {type}</p>
      </div>
        <Reschedule
       isOpen={reschedule}
       isClose={() =>setReschedule(false)}
       appointmentid={id}
       />
       {sure && (
        <div>
          Are you sure you wanna remove the appointment
        <button
  onClick={handleremove}
  className="px-3 py-1 ml-2 bg-red-600 text-white font-semibold rounded-lg 
             shadow-md hover:bg-red-700 active:scale-95 
             transition-all duration-200 ease-in-out 
             focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
>
          I am sure
    </button>
        </div>
       )}
      <div className="mt-4 flex gap-3">
        <Button onClick={()=> setReschedule(true)} variant="outline">Reschedule</Button>
        <Button onClick={()=>setsure(true)} variant="destructive">Cancel</Button>
      </div>
    </div>
  );
}


function PastAppointment({ date, time, doctor, type, status }: any) {
  return (
    <div className="border rounded-xl p-5 mb-3 flex justify-between items-center">
      <div>
        <p className="font-medium">
          {date} <span className="text-sm text-muted-foreground ml-2">{time}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {doctor} • {type}
        </p>
      </div>

      <Badge
        variant={
          status === "Completed"
            ? "secondary"
            : status === "Cancelled"
            ? "outline"
            : "default"
        }
      >
        {status}
      </Badge>
    </div>
  );
}
