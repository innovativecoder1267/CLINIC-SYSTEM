import mongoose from "mongoose";


interface Slot{
    Clinic_id:mongoose.Types.ObjectId
    start_time:Date
    end_time:Date,
    isBooked:boolean
}

const SlotSchema=new mongoose.Schema<Slot>({
    Clinic_id:{
        type:mongoose.Types.ObjectId,
        ref:"Clinic",
        required:true
    },
    start_time:{
        type:Date,
        required:true
    },
    end_time:{
        type:Date,
        required:true
    },
    isBooked:{
        type:Boolean,
        required:true
    }
})
export const SlotModel=mongoose.models.Slot||mongoose.model<Slot>("Slot",SlotSchema)