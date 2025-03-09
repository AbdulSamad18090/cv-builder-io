import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/connect-db/Connection";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { message: "User not found. Please check your email." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return Response.json(
        { message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    return Response.json(
      {
        id: user._id.toString(),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profile_image: user.profile_image || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return Response.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
