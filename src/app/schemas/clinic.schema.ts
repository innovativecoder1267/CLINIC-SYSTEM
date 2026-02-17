import mongoose from "mongoose";

interface Clinic{
    name:string
}

const ClinicSchema=new mongoose.Schema<Clinic>({
    name:{
        type:String,
        required:true
    }

})
export const Clinic=mongoose.models.Clinc||mongoose.model("Clinic",ClinicSchema)