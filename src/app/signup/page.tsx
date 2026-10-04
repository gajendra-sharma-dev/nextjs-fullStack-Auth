'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Sign () {
    const router  = useRouter()
    const [user,setUser] = React.useState(
        {
            username:"",
            email:"",
            password:""
        }
    )
    const [Buttondisable,setButtondiable] = useState(false)
    const [Loding,setLoding] = useState(false)
    const onSignIn = async() => {
       try {
         setLoding(true)
        const response =  await axios.post("/api/users/signup",user)
        console.log(response.data);
        toast.success("successfull login")
        router.push("/login")
       } catch (error:any) {
        console.log(error,"login failed]");
        toast.error("login failed")
       }finally {
          setLoding(false)
       }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtondiable(false)
        }else{
            setButtondiable(true)
        }
    },[user])

    return (
        <>
        <div className="flex flex-col gap-2 w-[400px] mx-auto mt-10">
           <h1>{Loding ? "...creating" : "sign - up"}</h1>
            <input
              className="border-2 border-gray-200 p-2 rounded-md"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <input
              className="border-2 border-gray-200 p-2 rounded-md"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <input
              className="border-2 border-gray-200 p-2 rounded-md"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit" onClick={onSignIn}>{Buttondisable?"No sign-in":"sign"}</button>
            <Link href="/login">Already have an account? Login</Link>
        </div>
        </>
    )
}