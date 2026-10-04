import conntedDb from "@/dbConfig/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await conntedDb()
    const reqbody = await request.json()
    const {token} = reqbody
    console.log(token);
    
  const user =  await User.findOne({verificationToken:token,verificationTokenExpiry:{$get:Date.now()}})

    if(!user) {
        return NextResponse.json({error:"Invaild token"},{status:400})
    }

    console.log(user);

  user.isVerfiyed = true;
  console.log(user.isVerfiyed)
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined; 
  await user.save() 

  return NextResponse.json({
    message:"email verfiy successfully",
    success : true
  })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}