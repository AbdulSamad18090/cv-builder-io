// app/api/auth/google-signin/route.js
import { connectDB } from "@/lib/connect-db/Connection";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const userData = await request.json();

    await connectDB();

    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Create new user if they don't exist
      user = new User({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        profile_image: userData.profile_image,
        isGoogleLogin: true,
      });
      await user.save();
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Google sign-in processing error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
