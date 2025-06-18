"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default  function VerifyuserEmail(){
    const [token,setToken] = useState("")
    const [verify , setVerify] = useState(false)
    const [error , setError] = useState(false)

    const verifyEmail = async()=>{

        try {
            await axios.post("/api/Users/VerifyEmail" , {token})
            
            
            setVerify(true)
            
        } catch (error:any) {

            setError(true)
            console.log(error.response.data);
            
            
        }




    }

    useEffect(()=>{

        const token = window.location.search.split("=")[1]
        setToken(token || "")
    

    },[])

    useEffect(()=>{

        if(token.length > 0){
            verifyEmail()
        }

        

    },
    
    [token])


    return(
         <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>

      {verify ? (
        <>
          <h2 className="text-green-600 mb-2">Verification Successful ✅</h2>
          <Link href="/Login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </>
      ) : error ? (
        <h2 className="text-red-500">Verification Failed ❌</h2>
      ) : (
        <h2 className="text-gray-600">Verifying...</h2>
      )}
    </div>
    )



}