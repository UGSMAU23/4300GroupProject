import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/config/mongodb";
import Contact from "@/models/ContactSchema";

export async function POST(request: NextRequest) {
    try {
      const { name, email, message } = await request.json();
  
      if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
      }
  
      await connectMongoDB();
      await Contact.create({ name, email, message });
  
      return NextResponse.json({ message: "Message received!" }, { status: 200 });
    } catch (error) {
      console.error("Contact form error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}  