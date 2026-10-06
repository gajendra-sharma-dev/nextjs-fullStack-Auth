import nodemailer from "nodemailer";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";


export const sendEmail = async({email,emailType,userID}:any) => {
   try {
    //create hesh token 
    const hashToken = await bcrypt.hash(userID.toString(),10)

    if(emailType === "VERIFY") {
        await User.findByIdAndUpdate(userID,{
            verificationToken:hashToken,
            verificationTokenExpiry:Date.now() + 3600000
        })
    }else if(emailType === "FORGET") {
        await User.findByIdAndUpdate(userID,{
            forgetPasswordToken:hashToken,
            forgetPasswordTokenExpiry:Date.now() + 3600000
        })
    }
   
  const  transport = nodemailer.createTransport({
  host: process.env.NODEMILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});


const mailOption = {
    from : process.env.NODEMAILER_USER,
    to : email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
}

 const info = await transport.sendMail(mailOption)
 return info

   } catch (error:any) {
    throw new Error(error.message)
    
   }
}