import {connect} from "@/dbConfig/dbConfig"
import User from "@/Models/userModels"
import {NextResponse , NextRequest} from "next/server"
import bcryptjs from "bcryptjs"

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



    } catch (error:any) {
        return NextResponse.json({error : error.message})
    }
}
    