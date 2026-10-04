'use client'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { log } from "console"

export default function Login () {
    const router = useRouter()
    const [user,setUser] = React.useState(
        {
            email:"",
            password:""
        }
    )
    const [Buttondisable,setButtondisable] = useState(false)
    const [loading,setloading] = useState(false)
    const onLogin = async() => {
      try {
        setloading(true)
         const response = await axios.post("/api/users/login",user)
       console.log(response.data);
       toast.success("login successfully")
       router.push("/profile")
        
      } catch (error:any) {
        console.log(error.response?.data);
        
        console.log(error,"login failed");
        toast.error("login failed")
        
      }finally{
        setloading(false)

      }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0) {
            setButtondisable(false)
        }else{
            setButtondisable(true)
        }
    },[user])
    return (
        <>
         <div className="flex flex-col gap-2 w-[400px] mx-auto mt-10">
            <h1>{loading ? "....login" : "login"}</h1>
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
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit" onClick={onLogin}>{Buttondisable ? "No login" : "Login"}</button>
            <Link href="/signup">Don't have an account? Sign Up</Link>
        </div>
        </>
    )
}