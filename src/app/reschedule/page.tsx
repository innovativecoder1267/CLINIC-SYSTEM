"use client"

import axios from "axios";
import { useState } from "react";

 


const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
];
  interface ReschedulData{
    isOpen:boolean
    isClose:()=>void
    appointmentid:string
  }
export default function Reschedule({isOpen,isClose,appointmentid}:ReschedulData) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [checkuptype,setcheckuptype]=useState<string | null>("")
  const [Description,setdescription]=useState<string | null>("")
  const [date,setdate]=useState<string | null>("")
  const [error,seterror]=useState("")
  
  if(!isOpen)return null
  if(error){
    setTimeout(() => {
      seterror("")
    }, 3000);
  }
    async function handleclick(){
    try {
      const response=await axios.post("api/reschedule",{
        date,
        selectedSlot,
        checkuptype,
        Description,
        appointmentid
      })
      if(response.status===200){
        alert("Meeting rescheduled")
        isClose()
      }

    } catch (error) {
      console.error("Error is",error)
      alert(" you can maximum select date upto max 15 days")
    }
  }

 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Modal */}
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
          Reschedule Meeting
          </h2>
          <button 
          onClick={isClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto px-6 py-5 space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                onChange={(e) =>setdate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Available Time Slots
            </p>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border px-3 py-2 text-sm transition
                    ${
                      selectedSlot === slot
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-blue-500"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Type
            </label>
            <select 
            value={checkuptype??""}
            onChange={(e) =>setcheckuptype(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="checkuptype"> Select Type</option>
                <option value="CONSULTATION">Consultation</option>
                <option value="FOLLOW-UP">Follow-up</option>
                <option value="CHECKUP">Check-up</option>
            </select>
          </div>

          {/* Reason */}
          <div >
            <label  className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit (Optional)
            </label>
            <textarea
             onChange={(e) =>setdescription(e.target.value)}
              rows={3}
              placeholder="Brief description of your concern"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-red-500 font-light ">{error}</p>
         </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
          onClick={isClose}
            className="rounded-lg bg-gray-100 px-5 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button onClick={handleclick} className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>    
  );
};