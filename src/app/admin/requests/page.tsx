import { requireUser } from "@/lib/auth";
import { api } from "@/lib/api";
import { Rental } from "@/lib/types";
import RequestList from "@/components/RequestList";
export default async function Page() {
  const c = await requireUser("admin");
  return (
    <section className="section">
      <h1>All requests</h1>
      <p className="lead">Manage equipment requests across the library.</p>
      <RequestList admin items={await api<Rental[]>("/rentals", c.token)} />
    </section>
  );
}
