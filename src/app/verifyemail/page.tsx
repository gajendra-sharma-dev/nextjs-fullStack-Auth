'use client'
import axios from "axios"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function varfiyEmail() {
    const [token,setToken] = React.useState("")
    const [verfiy,setVerfiy]= React.useState(false)
    const [error,seterror] = React.useState(false)



     const verfiyUserEmail = async() => {
        try {
            await axios.post("/api/users/verifyEmail",{token})
            setVerfiy(true)
        } catch (error:any) {
            seterror(true)
            console.log(error.response.data);
            
            
        }
     }

     React.useEffect(()=>{
        const urlParams = window.location.search.split("=")[1];
         setToken(urlParams || "")
     },[])

     React.useEffect(()=>{
        if(token.length > 0) verfiyUserEmail()
     },[token])

     return (
        <>
        <div className="flex justify-center items-center h-screen">
        <h1>Verifying Email</h1>
        <h2 className="text-lg text-gray-700">{token ? `Verifying email with token: ${token}` : "No token found"}</h2>
        {verfiy && <div className="text-green-500">Email verified successfully! <Link href="/login" className="text-blue-500 underline">Login</Link></div>}
        {error && <div className="text-red-500">Invalid or expired token. Please try again.</div>}
        </div>
        </>
     )
}