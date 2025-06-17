import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/Models/userModels";
import { NextResponse } from "next/server";
import { log } from "console";

export const sendmailer = async ({ email, emailType, userId }: any) => {
  try {
    const hashedtoken = await bcrypt.hash(userId.toString(), 10);
    console.log(hashedtoken);
    
    
    if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {
            $set: {
                verifyToken: hashedtoken,
                verifyTokenExpiry: Date.now() + 3600000,
            },
        });
    } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, {
            $set: {
                forgotPasswordToken: hashedtoken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            },
        });
    }
     
    

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailoptions = {
      from: "shashank5418shashu@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedtoken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedtoken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailoptions);

    return mailresponse;




  } catch (error:any) {

    throw new Error(error.message)

  }
};
