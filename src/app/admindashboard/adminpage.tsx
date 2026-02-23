"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function AdminDashboard() {
  const [TodaySlots,setTodaySlots]=useState([])
  const [AvailableSlots,setAvailaibleSlots]=useState([])
  const [Completed,setCompleted]=useState([])
  const [Shows,setShows]=useState([])
  const [Appointments,setappointment]=useState<any[]>([])
  const [startdate,setstartdate]=useState("")
  const [endDate,setendDate]=useState("")
  const [searchpatients,setsearchpatients]=useState<string>("")
  const {data:session,status}=useSession();

  if(!session){
    redirect("/")
  }
  if(session.user.Role!=="ADMIN"){
    redirect("/")
  }
  useEffect(()=>{
    async function SlotGet() {
    try {
      const res=await axios.get("/api/slots")
      if(res.status===200){
        console.log(res.data);
        setTodaySlots(res.data.todaybookings.length)
        setAvailaibleSlots(res.data.availaibleslots)
        setCompleted(res.data.completedslots)
        setShows(res.data.Shows)
      }
    } catch (error:any) {
      console.error("Error is",error?.message)
    }  
    }
    SlotGet()
  },[])
  useEffect(()=>{
     async function AppointmentGetter() {
      try {
      const res=await axios.get("/api/getappointmentdata")
      if(res.status===200){
         setappointment(res.data.Appointment)
       }  
      } catch (error) {
        alert("Something bad happened")
        console.log("Error occured",error)
      }
      
    }
    AppointmentGetter();
  },[])
 
  async function handleclick() {
    if(!startdate||!endDate)return
    try {
      const res=await axios.post("api/setavailaibledate",{
        startdate,
        endDate
      })
      if(res.status===200){
        alert("avaliablity set")
      }
    } catch (error) {
      console.log('error is',error)
    }
  }

  return (
    <div className="p-6 space-y-6">
        <button onClick={()=>signOut({callbackUrl:"/login"})}>⏻</button>

       <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Saturday, January 24, 2026
        </p>
      </div>
 

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value={TodaySlots} icon={<CalendarDays />} />
        <StatCard title="Available Slots" value={AvailableSlots} icon={<Clock />} />
        <StatCard title="Completed" value={Completed} icon={<CheckCircle />} />
        <StatCard title="No-Shows" value="0" icon={<XCircle />} />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

         <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Appointments</CardTitle>
            <Button>New Appointment</Button>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="py-2 text-left">Time</th>
                  <th className="text-left">Patient</th>
                  <th className="text-left">Type</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Date</th>

                </tr>
              </thead>

              <tbody className="divide-y">
                 
               {Appointments.map((value,index)=>(
                <AppointmentRow
                key={index}
                name={value.User_id.username}
                type={value.type}
                status={value.status}
                time={value.slot_time}
                date={value.date}
      />
               ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* PATIENTS */}
         <Card>
  <CardHeader>
    <CardTitle>Recent Patients</CardTitle>
  </CardHeader>

    <CardContent className="space-y-3">
    <Input placeholder="Search patients..."
    onChange={(e) =>setsearchpatients(e.target.value)}
    />
 
    {
      Appointments.filter((value)=>
       searchpatients.length===0||value.User_id.username.toLowerCase().includes(searchpatients.toLowerCase())
      )
    .map((value, index) => (
      <Patient
        key={index}
        name={value.User_id.username}
      />
    ))}
      </CardContent>
      </Card>


          {/* AVAILABILITY */}
          <Card>
            <CardHeader>
              <CardTitle>Availability Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input onChange={(e) =>setstartdate(e.target.value)} type="date" />
              <Input onChange={(e) =>setendDate(e.target.value)} type="date" />
              <Button onClick={handleclick}  className="w-full">Set Availability</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value, icon }: any) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </CardContent>
    </Card>
  );
}

function AppointmentRow({ time, name, type, status,date }: any) {
  const statusMap: any = {
    CONFIRMED: <Badge>Booked</Badge>,
    COMPLETED: <Badge variant="secondary">Completed</Badge>,
    NOSHOWS: <Badge variant="destructive">No-show</Badge>,
  };

  return (
    <tr>
      <td className="py-3">{time}</td>
      <td>{name}</td>
      <td>{type}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td className="text-right">
        {status === "Booked" && <Button size="sm">Complete</Button>}
      </td>
     </tr>
  );
}

function Patient({ name }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span>{name}</span>
    </div>
  );
}