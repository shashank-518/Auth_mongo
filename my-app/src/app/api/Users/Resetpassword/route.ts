import User from "@/Models/userModels";
import { NextRequest , NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";


connect()

export default async function POST(request:NextRequest){


    try {

        const reqbody = await request.json()

    const {token,password} = reqbody;

     const user = await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordTokenExpiry:{$gt:Date.now()},
        })

    console.log(user);

        if(!user){
            return NextResponse.json({error:"Invalid token or token expired"},{status:400})
        }

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({message:"Password reset successfully"},{status:200})  

        
    } catch (error:any) {

        return NextResponse.json({error:error.message})
        
    }

    


    
    
    
}