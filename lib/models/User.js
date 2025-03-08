import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // ✅ Make password optional for Google users
      required: function () {
        return !this.isGoogleLogin; // Require password only if NOT using Google login
      },
    },
    profile_image: {
      type: String,
      default: "",
    },
    isGoogleLogin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
