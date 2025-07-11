import connect from "@/dbConfig/connect";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request){
      try {
        const  reqbody=await request.json();
        const  {token}=reqbody;
  
        const user =await User.findOne({ verifytoken: token ,verifytokenexpiry:{$gt:Date.now()}});
  
        if(!user)return NextResponse.json({error:"user not found",status:500});
  
        user.isVerified=true;
        user.verifytoken=undefined;
        user.verifytokenexpiry=undefined;
        await user.save();
  
        return NextResponse.json({message:"verified successfully !!",success:true});
      } catch (error) {
        return NextResponse.json({ error: error.message, status: 500 });
      }
}