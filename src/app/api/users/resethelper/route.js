import sendMail from "@/helpers/sendMail";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {email} = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "user does not exist,signup to create an account !!",
        status: 500,
      });
    }
    const response = await sendMail(email, "RESET", user._id);
    return NextResponse.json({
      message: "Reset email sent successfully",
      success:true
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
