import { UserModel } from "@/app/schemas/User.schema";
import { UsernameValidation } from "@/app/schemas/User.schema";
import DbConnection from "@/lib/db/database";
import { useParams } from "next/navigation";



export default function CheckingUsernameValidation(){
    const params=useParams()
    const Username=params.username
    
    
}