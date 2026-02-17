import mongoose from "mongoose";

interface Availaible{
  startDate:Date,
  endDate:Date,
  reason:string,
  Isavailaible:boolean
}

const AvailabilitySchema = new mongoose.Schema<Availaible>({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    index:{expires:0}
  },
  reason: {
    type: String,
    default: "Doctor Unavailable",
  },
  Isavailaible:{
    type:Boolean
  }
}, { timestamps: true });

export const AvailabilityModel =
  mongoose.models.AvailabilityModel ||
  mongoose.model("AvailabilityModel", AvailabilitySchema);