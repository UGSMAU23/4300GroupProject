import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: {email: string};
}

// get email for a user. used for session related things. 
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });
    return NextResponse.json({ user });
}