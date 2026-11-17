import { DefaultSession } from "next-auth";
import { Role } from "@/lib/types";
declare module "next-auth" {
  interface User {
    backendToken: string;
    role: Role;
  }
  interface Session {
    user: DefaultSession["user"] & { id: string; role: Role };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    role: Role;
  }
}
