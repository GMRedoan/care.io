"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import Swal from "sweetalert2"
import bcryptjs from 'bcryptjs'


export const postUser = async (payload) =>{
    const { name, email, password, nid, contact } = payload
    if(!email || !password){
                        Swal.fire({
                            title: "Error",
                            text: "User already exist",
                            icon:  "error",
                            confirmButtonColor: "#11B2ED"
                        });
        return null
    }

    const isExist = await dbConnect(collections.USER).findOne({ email })
    if(isExist){
        Swal.fire({
            title: "Error",
            text: "User already exist",
            icon: "error",
            confirmButtonColor: "#11B2ED"
        });
        return null
    }

    const newUser = {
        provider: "credentials",
        nid, name, email, contact,
        password: await bcryptjs.hash(password, 10),
        createdAt: new Date().toISOString()
    }

    const result = await dbConnect(collections.USER).insertOne(newUser)
    if(result.acknowledged){
        return{
            ...result,
            insertedId: result.insertedId.toString()
        }
    }
}

export const loginUser = async (payload) => {
    const { email, password } = payload
    if (!email || !password) {
        Swal.fire("Error", "User already exist", "error")
        return null
    }

    const user = await dbConnect(collections.USER).findOne({ email })
    if (!user) return null

    const isMatched = await bcryptjs.compare(password, user.password)
    if (isMatched) { return user }
    else {
        return null
    }
}