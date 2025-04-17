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
    const { username, email, answers, currentPassword, newPassword, description, scores } = await request.json();
    await connectMongoDB();
    const update: any = {};

    if (username) update.username = username;
    if (email) update.email = email;
    if (answers) update.answers = answers;
    if (currentPassword && newPassword) {
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const matches = await bcrypt.compare(currentPassword, user.get('password').toString());
        if (matches) {
            const hashedPassword = await bcrypt.hash(newPassword, 15);
            update.password = hashedPassword;
        }
    }
    if (description) update.description = description;
    if (scores) update.scores = scores;
    
    await User.findByIdAndUpdate(id, update);
    return NextResponse.json({message: "User updated"}, {status: 200});
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const user = await User.findById(id).select("answers");
    // console.log("user: " + user?.answers);

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ answers: user.answers }, { status: 200 });
}