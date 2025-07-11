import connect from "@/dbConfig/connect";
import tokenDataExtracter from "@/helpers/tokenDataExtracter";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request){
     try {
        const tokendata=tokenDataExtracter(request);
        connect();
        const data=await User.findOne({_id:tokendata.id}).select("-password");
        return NextResponse.json({data,success:true});
     } catch (error) {
         return NextResponse.json({error:error.message,status:500});
     }
}