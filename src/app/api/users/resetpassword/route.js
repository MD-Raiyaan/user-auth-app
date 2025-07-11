
import connect from "@/dbConfig/connect";
 import { User } from "@/models/userModel";
 import { NextResponse } from "next/server";
 import bcrypt from "bcrypt";
 
 connect();
 export async function POST(request){
       try {
         const  reqbody=await request.json();
         const  {token,password}=reqbody;
   
         const user = await User.findOne({
           forgotpasswordtoken: token,
           forgotpasswordtokenexpiry: { $gt: Date.now() },
         });

         console.log(user);
   
         if(!user)return NextResponse.json({error:"user not found",status:500});
   
         user.forgotpasswordtoken = undefined;
         user.forgotpasswordtokenexpiry = undefined;
         user.password=await bcrypt.hash(password,10);
         await user.save();
   
         return NextResponse.json({message:"verified successfully !!",success:true});
       } catch (error) {
         return NextResponse.json({ error: error.message, status: 500 });
       }
 }