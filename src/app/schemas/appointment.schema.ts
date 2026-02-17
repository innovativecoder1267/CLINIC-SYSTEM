import mongoose from "mongoose";


interface Appointment{
    Slot_id:mongoose.Types.ObjectId
    status:string
    Clinic_id:mongoose.Types.ObjectId
    User_id:mongoose.Types.ObjectId
    type:string,
    description?:string,
    date:Date,
    slot_time:string
}

const AppointmentSchema=new mongoose.Schema<Appointment>(
{
    Slot_id:{
        type:mongoose.Types.ObjectId,
        ref:"Slot",
    },
    status:{
        type:String,
        enum:["BOOKED","COMPLETED","CANCELLED","NO_SHOW"],
    },
    Clinic_id:{
        type:mongoose.Types.ObjectId,
        ref:"Clinic",
    },
    date:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        enum:["CONSULTATION","CHECKUP","FOLLOW-UP"]
    },
    description:{
        type:String,
        required:false
    },
    slot_time:{
        type:String,
        required:true
    },
    User_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
}
)
export const  AppointmentModel=mongoose.models.Appointment||
mongoose.model("Appointment",AppointmentSchema)