import mongoose, {Schema,Document} from "mongoose"
import {z} from "zod"
interface User extends Document{
    username:string,
    email:string,
    password:string,
    isVerified:boolean,
    VerificationCode:string,
    PhoneNumber:number,
    Role:string
}
 export const UsernameValidation=z
 .string()
 .min(3,"Minimum length is 3")
 .max(6,"This field  can't be more than 6")
 .regex(/^[a-zA-Z0-9_]+$/)


const UserSchema=new Schema<User>({
     
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    VerificationCode:{
        type:String,
     },
    PhoneNumber:{
        type:Number
    }, 
    Role:{
        type:String,
        enum:["ADMIN","USER"],
        required:true
    }
})

// export const UserModel=mongoose.model<User>("User",UserSchema)
export const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);