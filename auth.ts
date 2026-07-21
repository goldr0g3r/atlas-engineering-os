import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongodb";
import { getCollection } from "@/lib/collections";
import { normalizeEmail } from "@/lib/credential-user";
import { verifyPassword } from "@/lib/password";

const providers = [
  Credentials({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = normalizeEmail(String(credentials.email ?? ""));
      const password = String(credentials.password ?? "");
      const user = await (await getCollection("credentialUsers")).findOne({ email, disabledAt: { $exists: false } });
      if (!user || typeof user.passwordHash !== "string") return null;
      if (!(await verifyPassword(password, user.passwordHash))) return null;
      await (await getCollection("credentialUsers")).updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date().toISOString() } });
      return { id: user._id.toString(), name: String(user.name), email: String(user.email) };
    },
  }),
  GitHub,
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
