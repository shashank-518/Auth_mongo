import { NextResponse , NextRequest  } from "next/server";
import User from "@/Models/userModels";
import { getUserDetails } from "@/Helpers/getUserDetails";
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function GET(req: NextRequest){

    try {
        const data = await getUserDetails(req)

        const user = await User.findOne({_id : data}).select("-password")

        return NextResponse.json({
            message: "User Details",
            success: true,
            user})
        
        
    } catch (error:any) {

        return NextResponse.json({error: error.message})
        
    }

}
