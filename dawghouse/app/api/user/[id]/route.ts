import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";
import bcrypt from "bcryptjs";

interface RouteParams {
    params: {id: string};
}

export async function PUT(request: NextRequest, {params}:RouteParams) {
    const { id } = await params;
    const { username, email, answers, currentPassword, newPassword } = await request.json();
    await connectMongoDB();
    const update: any = {};

    if (username) update.username = username;
    if (email) update.email = email;
    if (answers) update.answers = answers;
    if (currentPassword && newPassword) {
        const user = await User.findById(id);
        
        console.log("USER: ", user);
        const matches = await bcrypt.compare(currentPassword, user.get('password'));
        if (matches) {
            const hashedPassword = await bcrypt.hash(newPassword, 15);
            update.password = hashedPassword;
        }
    }
    
    await User.findByIdAndUpdate(id, update);
    return NextResponse.json({message: "User updated"}, {status: 200});
}