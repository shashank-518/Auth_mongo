"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, {  useEffect, useState } from "react";

export default function Handle() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [verify, setverify] = useState(false);
  const [error , setError] = useState(false);

  const Changepass = async () => {
    try {
      const pass = await axios.post("/api/Users/Resetpassword", {
        password,
        token,
      });
      setPassword('')
      setverify(true);
    } catch (error) {
      setError(true)
      return NextResponse.json({ error: "Failed to change password" });
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token || "");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Set Your Password
        </h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={Changepass}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition duration-300 font-semibold"
        >
          Submit
        </button>

        {verify && (
          <>
            <div className="flex flex-col items-center justify-center mt-10 space-y-4">
              <div className="text-green-600 text-center text-lg font-semibold">
                ✅ Password changed successfully!
              </div>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300" onClick={()=> router.push("/Login")}  >
                Go to Login
              </button>
            </div>
          </>
        )}


        {error && (
          <>
            <div className="flex flex-col items-center justify-center mt-10 space-y-4">
              <div className="text-red-600 text-center text-lg font-semibold">
                Oops there was an error while changing password!
              </div>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300" onClick={()=> router.push("/Signup")} >
                Go to Signup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
