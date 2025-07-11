import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export default function tokenDataExtracter(request){
    
     try {
        const  token = request.cookies.get("token")?.value ||  "";
        
        const  decodedtoken= jwt.verify(token,process.env.SECRET_KEY);
       
        return decodedtoken;
     } catch (error) {
        throw new Error(error.message);
     }
     
}