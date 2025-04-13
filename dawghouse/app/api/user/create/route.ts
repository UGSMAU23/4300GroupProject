import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    const {username, email, password} = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        username,
        password: hashedPassword,
        email
    }
    try {
        await User.create(newUser);
        return NextResponse.json({message: "User created"}, {status: 201});
    } catch {
        return NextResponse.json({message: "Error creating user"}, {status: 500})
    }
}