import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmail = process.env.AUTH_ALLOWED_EMAIL?.trim().toLowerCase();
      if (!allowedEmail) return true;
      return user.email?.trim().toLowerCase() === allowedEmail;
    }
  },
  pages: { signIn: "/" },
  trustHost: true
});
