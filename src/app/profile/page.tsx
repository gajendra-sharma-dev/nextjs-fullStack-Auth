'use client'
import toast from "react-hot-toast"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { useState } from "react"
export default function profile() {
    const [data,setdata] = useState("nothing")
    const router = useRouter()
    const logoutButton = async () => {
        try {
       const response = await axios.get("/api/users/logout")
       toast.success("successfull logout")
         router.push("/login")
         
        } catch (error:any) {
            console.log("failed to logout",error);
            toast.error("failed to logout")
        }
    }

    const getUser = async() => {
        try {
          const response =  await axios.get("/api/users/me")
        
          setdata(response.data.user._id)
            toast.success("successfull get user")
          
            
        } catch (error:any) {
            console.log("user not found");
           toast.error("user not found")
            
            
        }
    }
    return (
        <>
        <h2>user prfile:</h2>
        <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className="bg-red-400 text-white p-2 rounded-md" type="submit" onClick={logoutButton}>logout</button>
          <button className="bg-blue-500 text-white p-2 rounded-md" type="submit" onClick={getUser}>getUser</button>
        </>
    )
}