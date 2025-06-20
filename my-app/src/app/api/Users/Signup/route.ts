import {connect} from "@/dbConfig/dbConfig"
import User from "@/Models/userModels"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendmailer } from "@/Helpers/sendmailer"


export async function POST(req: NextRequest) {

    try {

        const reqbody = await req.json()
        const {username , email , password} = reqbody

        console.log(reqbody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"} , {status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()

        await sendmailer({email , emailType:"VERIFY", userId: savedUser._id})

        

        return NextResponse.json({
            message:"User created successfully" ,
            
        })
        
        

        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error:"There is something wrong" , } , {status:500})
    }


}
   


connect()
