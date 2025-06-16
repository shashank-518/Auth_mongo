import User from "@/Models/userModels";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { error } from "console";
import { sendmailer } from "@/Helpers/sendmailer";


connect()


export default async function POST(request:NextRequest){

    try {

        const reqBody = await request.json()
        const {email,token} = reqBody

        console.log(reqBody);

        const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()},
        })

        console.log(user);

        if(!user){
            return NextResponse.json({error:"Invalid token or token expired"},{status:400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()


        


        return NextResponse.json({message:"Email verified successfully"},{status:200})
        



        
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }

}