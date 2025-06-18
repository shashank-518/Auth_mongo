"use client";
import React, { useState } from "react"
import {NextResponse } from "next/server"
import axios from "axios"



export default  function Handler(){

    const [email , setEmail] = useState('')

    const sendmail = async()=>{

        try{
             await axios.post('/api/Users/ForgetPassword' , {email})


        }
        catch(error:any){
            return NextResponse.json({message:error.response.data.message})
        }


    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
  <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Reset Password</h2>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
    />

    <button
      onClick={sendmail}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
    >
      Submit
    </button>
  </div>
</div>

    )

}