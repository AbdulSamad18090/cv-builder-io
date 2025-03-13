import { connectDB } from "@/lib/connect-db/Connection";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { email, newPassword } = await req.json();

    // Connect to the database
    await connectDB();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });

    if (!existing) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password using their ID
    await User.findByIdAndUpdate(existing._id, { password: hashedPassword });

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      { error: "An error occurred during password reset." },
      { status: 500 }
    );
  }
}
