import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import User from "@/models/UserSchema";

interface RouteParams {
    params: {id: string};
}

// get data except password for a user, used for usersDashboard
export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        const users = await User.find({}, '-password'); // return all fields except password
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}