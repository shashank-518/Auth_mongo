import {connect} from "@/dbConfig/dbConfig"
import User from "@/Models/userModels"
import {NextResponse , NextRequest} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(req : NextRequest){

    try {
        
        const reqbody = await req.json()
        const {email,password} = reqbody

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User Not Found"} , {status:400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"} , {status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
            
        })

        response.cookies.set("token" , token , {
            httpOnly: true
        })

        return response;



    } catch (error:any) {
        return NextResponse.json({error : error.message})
    }
}
    