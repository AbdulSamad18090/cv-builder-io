import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect-db/Connection";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { firstname, lastname, email, password } = await req.json();

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered with this email." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: newUser._id, firstname, lastname, email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
