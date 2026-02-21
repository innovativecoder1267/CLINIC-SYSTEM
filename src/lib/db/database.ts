import mongoose from "mongoose";

type Isconnected={
    isconnected?:number
}
const connection:Isconnected={}

export default async function DbConnection(){
    if(connection.isconnected){
        console.log("Already connected to db");
    }

    try {
        const mongodburi:unknown=process.env.MONGO_URI
        const db=await mongoose.connect(mongodburi)
        connection.isconnected=db.connections[0].readyState
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error is",error)
        process.exit(1)
    }
}