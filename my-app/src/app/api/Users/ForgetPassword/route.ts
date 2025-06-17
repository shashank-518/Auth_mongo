import User from "@/Models/userModels";
import { NextRequest , NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendmailer } from "@/Helpers/sendmailer";

connect()

export async function POST(request:NextRequest){

    try{
        const reqBody = await request.json();
        const {email} = reqBody;
    
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User does not exist"})
        }

        const data = await sendmailer({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        })

        if(!data){
            return NextResponse.json({error:"Email not sent"})
        }

        return NextResponse.json({message:"Email sent successfully"})

    }
    catch(error:any){
        return NextResponse.json({error:error.message})
    }

    


}