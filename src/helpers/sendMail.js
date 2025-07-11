import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "@/models/userModel";


export default async function sendMail(email, emailtype, userid) {
  try {

    //    generating token
    const token = await bcrypt.hash(userid.toString(), 10);


    //   updating  token info in db
    if (emailtype == "VERIFY") {
      await User.findOneAndUpdate(
        { _id: userid },
        { verifytoken: token, verifytokenexpiry: Date.now() + 60 * 60 * 1000 }
      );
    } else if (emailtype == "RESET") {
      await User.findOneAndUpdate(
        { _id: userid },
        {
          forgotpasswordtoken: token,
          forgotpasswordtokenexpiry: Date.now() + 60 * 60 * 1000,
        }
      );
    } else {
      throw new Error("Invalid emailtype provided !!");
    }
    //  setup transporter
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.mailtrap_user,
        pass: process.env.mailtrap_pass,
      },
    });
    //  send mail

    const response = await transport.sendMail({
      from: "mohammedraiyaan2005@gmail.com",
      to: email,
      subject:
        emailtype == "verify" ? "Verify your account" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailtype === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${token}">here</a> to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/${
        emailtype === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${token}
            </p>`,
    });


    return response;
  } catch (error) {
     throw new Error(error.message);
  }
}

