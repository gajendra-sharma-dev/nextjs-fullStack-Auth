import { NextRequest, NextResponse } from "next/server";
import conntedDb from "@/dbConfig/db";
export async function GET(request:NextRequest) {
    try {
        await conntedDb()

      const response = NextResponse.json({
        message:"successfully logout",
        success:true
      })


      response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})


  return response


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}