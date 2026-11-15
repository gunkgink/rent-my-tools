"use server";
import { api } from "@/lib/api";
import { requireUser, credential } from "@/lib/auth";
import { Equipment } from "@/lib/types";
import { rentalError } from "@/lib/rules";
import { revalidatePath } from "next/cache";
export async function mutate(
  kind: "register" | "equipment" | "rentals",
  operation: "create" | "update" | "delete",
  id: string,
  values: Record<string, unknown>,
) {
  try {
    if (
      !["register", "equipment", "rentals"].includes(kind) ||
      !["create", "update", "delete"].includes(operation) ||
      !values ||
      typeof values !== "object"
    )
      throw Error("Invalid action.");
    if (kind === "register") {
      const { name, email, tel, role, password } = values;
      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof tel !== "string" ||
        !tel.trim() ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)) ||
        String(password).length < 6 ||
        !["member", "admin"].includes(String(role))
      )
        throw Error(
          "Check all registration fields. Password must contain at least 6 characters.",
        );
      await api("/auth/register", undefined, "POST", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        tel: tel.trim(),
        role,
        password,
      });
      return { ok: true, id: "" };
    }
    const current = await requireUser(
      kind === "equipment" ? "admin" : undefined,
    );
    if (operation !== "create" && !/^[a-f0-9]{24}$/i.test(id))
      throw Error("Invalid record reference.");
    let body: Record<string, unknown> = {};
    if (operation !== "delete") {
      if (kind === "equipment") {
        const { name, category, description, quantity, rentalRate } = values;
        if (
          !String(name || "").trim() ||
          !String(category || "").trim() ||
          !String(description || "").trim() ||
          !Number.isInteger(quantity) ||
          Number(quantity) < 0 ||
          typeof rentalRate !== "number" ||
          !Number.isFinite(rentalRate) ||
          rentalRate < 0
        )
          throw Error(
            "Enter a name, category, description, whole available quantity and nonnegative rate.",
          );
        body = { name, category, description, quantity, rentalRate };
      } else {
        if (operation === "create" && current.user.role !== "member")
          throw Error("Only members can create rental requests.");
        const { equipment, quantity, startDate, returnDate } = values;
        if (!/^[a-f0-9]{24}$/i.test(String(equipment)))
          throw Error("Choose equipment.");
        const item = await api<Equipment>(`/equipment/${equipment}`);
        const error = rentalError(
          Number(quantity),
          String(startDate),
          String(returnDate),
          item.quantity,
        );
        if (error) throw Error(error);
        body = { equipment, quantity: Number(quantity), startDate, returnDate };
      }
    }
    const record = await api<{ _id?: string }>(
      `/${kind}${operation === "create" ? "" : "/" + id}`,
      current.token,
      operation === "create"
        ? "POST"
        : operation === "update"
          ? "PUT"
          : "DELETE",
      operation === "delete" ? undefined : body,
    );
    for (const path of [
      "/",
      "/equipment",
      "/requests",
      "/admin/equipment",
      "/admin/requests",
    ])
      revalidatePath(path, "layout");
    return { ok: true, id: record._id || id };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error && !e.message.startsWith("NEXT_")
          ? e.message
          : "Your session may have expired. Log in and try again.",
    };
  }
}
export async function backendLogout() {
  const token = await credential();
  if (token) {
    try {
      await api("/auth/logout", token);
    } catch {}
  }
}
