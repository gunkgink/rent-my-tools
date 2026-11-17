"use client";
import { signOut } from "next-auth/react";
import { backendLogout } from "@/actions";
export default function AccountActions() {
  return (
    <button
      className="quiet"
      onClick={async () => {
        await backendLogout();
        sessionStorage.removeItem("persist:rental-draft");
        await signOut({ callbackUrl: "/" });
      }}
    >
      Log out
    </button>
  );
}
