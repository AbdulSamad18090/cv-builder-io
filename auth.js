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
            const errorData = await res.json();
            throw new Error(errorData.message || "Invalid email or password.");
          }

          const user = await res.json();

          // Ensure the returned user object contains all necessary fields
          return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profile_image: user.profile_image || "",
            isGoogleLogin: user.isGoogleLogin || false,
          };
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
                isGoogleLogin: true,
              }),
            }
          );

          if (!response.ok) {
            console.error("Google sign-in processing failed");
            return false;
          }

          const data = await response.json();
          if (data.user) {
            user.id = data.user._id;
            user.firstname = data.user.firstname;
            user.lastname = data.user.lastname;
            user.email = data.user.email;
            user.profile_image = data.user.profile_image;
            user.isGoogleLogin = true;
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstname = user.firstname || "";
        token.lastname = user.lastname || "";
        token.name =
          user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : user.name;
        token.email = user.email;
        token.profile_image = user.profile_image || "";
        token.isGoogleLogin = user.isGoogleLogin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name:
            token.firstname && token.lastname
              ? `${token.firstname} ${token.lastname}`
              : token.name,
          email: token.email,
          image: token.profile_image || token.picture || "", // Ensure image consistency
          isGoogleLogin: token.isGoogleLogin,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
