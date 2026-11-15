import { cache } from "react";
import "server-only";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { api } from "./api";
import { AuthData, Profile, Role } from "./types";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 86400 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(c) {
        if (!c?.email || !c.password) return null;
        try {
          const a = await api<AuthData>("/auth/login", undefined, "POST", {
            email: c.email,
            password: c.password,
          });
          return { ...a, backendToken: a.token };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
export async function credential() {
  const req = new NextRequest(
    process.env.NEXTAUTH_URL || "http://localhost:3000",
    { headers: await headers() },
  );
  const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return typeof jwt?.backendToken === "string" ? jwt.backendToken : undefined;
}
export const identity = cache(async function identity(): Promise<{
  token: string;
  user: Profile;
} | null> {
  const token = await credential();
  if (!token) return null;
  try {
    return { token, user: await api<Profile>("/auth/me", token) };
  } catch {
    return null;
  }
});
export async function requireUser(role?: Role) {
  const current = await identity();
  if (!current) redirect("/login");
  if (role && current.user.role !== role) redirect("/forbidden");
  return current;
}
