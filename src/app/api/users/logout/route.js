import { NextResponse } from "next/server";

export function GET(){
      try {
          const response= NextResponse.json({message:"logged out successfully ",success:true});
          response.cookies.set("token","",{expires:Date.now(),httpOnly:true});
          return response;
        } catch (error) {
          return NextResponse.json({error:"Something went wrong",status:500});
      }
}