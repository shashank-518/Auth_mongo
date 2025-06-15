"use client";

import { useRouter } from "next/navigation";
import axios from "axios";


export default function Profile() {

    const router = useRouter();
    const Logout = async()=>{
        try {
            await axios.get("/api/Users/Logout")
            router.push("/Login")


        } catch (error:any) {
            console.log(error.message);
            
        }
    }


    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Profile
      </h1>
      <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">
        Profile Name
      </h2>
        <div className="p-4">
  <button onClick={Logout} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
    Logout
  </button>
</div>
    </div>


  </div>
);
}