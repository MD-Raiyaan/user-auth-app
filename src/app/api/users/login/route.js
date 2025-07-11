import bcrypt from 'bcrypt'
import connect from '@/dbConfig/connect'
import { User } from '@/models/userModel'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

 connect();

export   async function POST(request) {
        try {
             const reqBody= await request.json();
             const {email,password}=reqBody;
    
             const user=await User.findOne({email});
    
             if(!user){
                return NextResponse.json({error:"user account does not exist ",status:400});
             }
    
             const correctPassword=await bcrypt.compare(password,user.password);
             if(!correctPassword){
                return NextResponse.json({error:"Invalid password ",status:400});
             }

             console.log(user);

             const token =await jwt.sign({id:user._id,email},process.env.SECRET_KEY);

             const response=NextResponse.json({message:"logged in successfully ",success:true,status:200});

             response.cookies.set("token",token,{expiry:new Date(Date.now()+ 24*60*60*1000)});
             return response;
             
        } catch (error) {
            return NextResponse.json({error:error.message,status:500});
        }
}