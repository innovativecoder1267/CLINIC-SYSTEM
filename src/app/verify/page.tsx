import VerifyOTP from "./verify"
import { Suspense } from "react"
 export default function Sign(){
    return(
      <Suspense fallback={<div>Loading...</div>}> 
      <div>
      <VerifyOTP/>
      </div>
      </Suspense>

    )
 }