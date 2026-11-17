"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "@/components/Link";
import { useRouter } from "next/navigation";
import { mutate } from "@/actions";
import { safeReturn } from "@/lib/rules";
export default function AuthForm({
  register = false,
  callback = "/equipment",
}: {
  register?: boolean;
  callback?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [show, setShow] = useState(false);
  return (
    <div className="auth-layout">
      <section>
        <p className="eyebrow">Your next project starts here</p>
        <h1>{register ? "Join the equipment library." : "Welcome back."}</h1>
        <p className="lead">A little equipment can make a big difference.</p>
      </section>
      <form
        className="panel"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setBusy(true);
          const f = new FormData(e.currentTarget);
          try {
            if (register) {
              if (f.get("password") !== f.get("confirm"))
                throw Error("Passwords must match.");
              const r = await mutate(
                "register",
                "create",
                "",
                Object.fromEntries(f),
              );
              if (!r.ok) throw Error(r.error);
              router.push(
                "/login?created=1&callbackUrl=" +
                  encodeURIComponent(safeReturn(callback)),
              );
              router.refresh();
            } else {
              const r = await signIn("credentials", {
                email: f.get("email"),
                password: f.get("password"),
                redirect: false,
              });
              if (r?.error)
                throw Error(
                  "Email or password is incorrect, or the service is unavailable.",
                );
              router.push(safeReturn(callback));
              router.refresh();
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : "Try again.");
            setBusy(false);
          }
        }}
      >
        <h2>{register ? "Create account" : "Log in"}</h2>
        {error && (
          <p role="alert" className="notice error">
            {error}
          </p>
        )}
        {register && (
          <label>
            Name
            <input name="name" required autoComplete="name" />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        {register && (
          <>
            <label>
              Telephone
              <input name="tel" type="tel" required autoComplete="tel" />
            </label>
            <label>
              Role
              <select name="role">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <small>
                Members send requests. Admins manage equipment and requests.
              </small>
            </label>
          </>
        )}
        <label>
          Password
          <input
            name="password"
            type={show ? "text" : "password"}
            required
            minLength={6}
            autoComplete={register ? "new-password" : "current-password"}
          />
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
          />
          Show password
        </label>
        {register && (
          <label>
            Confirm password
            <input
              type="password"
              name="confirm"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
        )}
        <button disabled={busy}>
          {busy ? "Please wait…" : register ? "Create account" : "Log in"}
        </button>
        <p>
          {register ? "Already have an account?" : "New to the library?"}{" "}
          <Link
            href={
              (register ? "/login" : "/register") +
              "?callbackUrl=" +
              encodeURIComponent(safeReturn(callback))
            }
          >
            {register ? "Log in" : "Create account"}
          </Link>
        </p>
      </form>
    </div>
  );
}
