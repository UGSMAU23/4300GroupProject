import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";

interface RouteParams {
    params: {id: string};
}

export async function PUT(request: NextRequest, {params}:RouteParams) {
    const {id} = await params;
    const {username: username} = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {username});
    return NextResponse.json({message: "User updated"}, {status: 200});
}