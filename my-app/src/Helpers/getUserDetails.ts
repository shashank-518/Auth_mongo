import User from "@/Models/userModels";
import { NextRequest, NextResponse } from "next/server";

import  jwt from "jsonwebtoken";

export async function getUserDetails(req:NextRequest){

    try {

        const token =  req.cookies.get('token')?.value || ''

        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)

        return decodedToken.id;

    } catch (error:any) {

        return NextResponse.json({error:error.message})
        
    }


}