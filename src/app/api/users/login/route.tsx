import conntedDb from "@/dbConfig/db"
// @ts-expect-error jsonwebtoken types are not installed
import jwt from "jsonwebtoken"
import User from "@/model/user.model"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"



export  async function POST(request:NextRequest) {
 try {
  
     await conntedDb() 
    const reqbody = await request.json()
   const {email,password} = reqbody

   const user = await User.findOne({email})

   if(!user) {
    return NextResponse.json({error:"user not found"},{status:400})
   }
   console.log(password);
   console.log(user.password);
   
   
 const vaildPassword = await bcrypt.compare(password,user.password)
   if(!vaildPassword) {
    return NextResponse.json({error:"Invalid password"},{status:400})
   }

   //create a session or token for the user
   const Tokendata = {
    id:user._id,
    email:user.email,
    username:user.username
   }
      const token = await jwt.sign(Tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1h"})

      const response = NextResponse.json(
        {
            message:"User login successfully",
            success:true,
        
        }
      )

      response.cookies.set("token",token,{
        httpOnly:true,
        maxAge:60*60,
      })
      return response
        
 } catch (error:any) {
    console.log(error.message,"failed when user login");
    
    return NextResponse.json({error:error.message},{status:500})
    
 }



}