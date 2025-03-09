import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials Login user ===>", credentials);

        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            console.log(res)
            const errorData = await res.json();
            throw new Error(errorData.message || "Invalid email or password.");
          }

          const user = await res.json();
          return user;
        } catch (error) {
          console.error("Login Error:", error);
          throw new Error(error.message || "Login failed. Please try again.");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const userData = {
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          profile_image: profile.picture,
          isGoogleLogin: true,
        };
        console.log("Google Sign-In User Data:", userData);
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
