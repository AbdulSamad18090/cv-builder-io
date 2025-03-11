import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            console.log(res);
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // In the signIn callback in your auth.js file
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                firstname: profile.given_name,
                lastname: profile.family_name,
                email: profile.email,
                profile_image: profile.picture,
              }),
            }
          );

          if (!response.ok) {
            console.error("Google sign-in processing failed");
            return false;
          }

          const data = await response.json();
          if (data.userId) {
            user.id = data.userId; // Set the user ID from the database
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
