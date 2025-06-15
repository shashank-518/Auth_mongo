"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Signup() {

  const router = useRouter();

    const [user , setUser] = React.useState({
        username:"",
        email:"",
        password:"",
    });

    const [buttonDisabled , setbuttonDisabled ] = React.useState(true)




    const onSignup = async()=>{
      try{
        const response = await axios.post("/api/Users/Signup", user)
        router.push("/Login")

      }catch(error){
        console.log(error)
      
      }
    }


    React.useEffect(()=>{

      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
        setbuttonDisabled(true)
      }
      else{
        setbuttonDisabled(false)
      }

    },[user])


    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Signup to Your Account
        </h2>
        
          
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          
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
            onClick={onSignup}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold mt-5"
          >
            {buttonDisabled ? "Sign Up" : "Fill the form"}
          </button>

          <div>
            <Link href="Login">Vist Login Page</Link>
          </div>
        
      </div>
    </div>
    )

}