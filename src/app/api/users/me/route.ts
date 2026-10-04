import { getDataFromToken } from "@/helper/getDataFromToken";
import conntedDb from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";



export async function GET(request:NextRequest) {
   try {
     await conntedDb()
  const userID =  await getDataFromToken(request)
 const user  = await User.findOne({_id:userID}).select("-password")
 console.log("user",user);
 
 return NextResponse.json({
    message:"user successfully fetch",
    success:true,
    user
 })
   } catch (error:any) {
    console.log(error,"error while fetchinh id from token");
    return NextResponse.json({error:error.message},{status:500})
    
   }
}