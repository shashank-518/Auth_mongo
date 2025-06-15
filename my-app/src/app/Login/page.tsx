"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";

export default function Login() {


  const router  = useRouter();


    const [user , setUser] = React.useState({
        email:"",
        password:"",
    });

    const [buttonDisabled , setbuttonDisabled] = React.useState(false);


    useEffect(()=>{

      if(user.email === "" || user.password === ""){
        setbuttonDisabled(true);
      }else{
        setbuttonDisabled(false);
      }
    },[user])


    const onLogin = async()=>{
      try {

        const response = await axios.post("/api/Users/Login" ,  user) 
        router.push("/Profile")
        
      } catch (error) {
        console.log("There is an error");
        console.log(error);
      }
    }


    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Signup to Your Account
        </h2>
        
          
          
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          
          <button
            type="submit"
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold mt-5"
          >
            {buttonDisabled ? "Loading..." : "Login"}
          </button>

          <div>
            <Link href="Signup">Vist Signup Page</Link>
          </div>
        
      </div>
    </div>
    )

}