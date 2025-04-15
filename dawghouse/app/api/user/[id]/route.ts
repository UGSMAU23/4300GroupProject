import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";

interface RouteParams {
    params: {id: string};
}

export async function PUT(request: NextRequest, {params}:RouteParams) {
    const { id } = params;
    const { username, email, answers, password } = await request.json();
    await connectMongoDB();
    const update: any = {};

    if (username) update.username = username;
    if (email) update.email = email;
    if (answers) update.answers = answers;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 15);
        update.password = hashedPassword;
    }
    
    await User.findByIdAndUpdate(id, update);
    return NextResponse.json({message: "User updated"}, {status: 200});
}