import conntedDb from "@/dbConfig/db";

import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import {sendEmail} from "@/helper/mailer"

export  async function POST(request:NextRequest) {
    try {
      await  conntedDb()
        const reqbody = await request.json()
        const {username,email,password} = reqbody
      const user =  await User.findOne({email})
        if(user) {
            return NextResponse.json({error:"user already exit"},{status:400})
        }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            const newUser = await new User({
                username,
                email,
                password:hashPassword
            })
     const savedUser =  await newUser.save()

    //send email verfication
    // await sandEmail({email,emailType:"VERIFY",userID:savedUser._id})
    await sendEmail({email,emailType:"VERIFY",userID:savedUser._id})

     return NextResponse.json(
        {
            message:"sign in successfully!",
            success:true,
            status:201,
            savedUser
        }
     )





    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}