import "server-only";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "./auth";
import { api, ApiError } from "./api";
import { Rental } from "./types";
export async function rentalForViewer(id: string) {
  const current = await requireUser();
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();
  try {
    return {
      current,
      rental: await api<Rental>("/rentals/" + id, current.token),
    };
  } catch (e) {
    if (e instanceof ApiError) {
      if (e.status === 403) redirect("/forbidden");
      if (e.status === 404) notFound();
      if (e.status === 401) redirect("/login");
    }
    throw e;
  }
}
