import bcrypt from 'bcrypt'
import connect from '@/dbConfig/connect'
import { User } from '@/models/userModel'
import { NextResponse } from 'next/server';
import sendMail from '@/helpers/sendMail';

 connect();

export   async function POST(request) {
        try {
             const reqBody= await request.json();
             const {username,email,password}=reqBody;
    
             const user=await User.findOne({email});
    
             if(user){
                return NextResponse.json({error:"Account already exists",status:400});
             }
    
             const hashedpassword= await bcrypt.hash(password,10);
    
             const createduser=await User.create({username,email,password:hashedpassword});

             await sendMail(email,'VERIFY',createduser._id);

    
             return NextResponse.json({message:"user created successfully ",success:true,status:201});
        } catch (error) {
            return NextResponse.json({error:error.message,status:500});
        }
}