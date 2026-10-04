'use client'

import { useParams } from "next/navigation";

export default function UserPrfile() {
    const userparams = useParams<any>()

    return (
        <>
        <h2>profile id : {userparams.id}</h2>
        </>
    )
}