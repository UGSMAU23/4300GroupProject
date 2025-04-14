import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: {email: string};
}

export async function GET(request: NextRequest, {params}:RouteParams) {
    const userEmail = await params;
    await connectMongoDB();
    const user = await User.find({email: userEmail});
    return NextResponse.json({user});
}