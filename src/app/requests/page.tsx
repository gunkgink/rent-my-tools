import { requireUser } from "@/lib/auth";
import { api } from "@/lib/api";
import { Rental } from "@/lib/types";
import RequestList from "@/components/RequestList";
export default async function Page() {
  const c = await requireUser("member");
  const items = await api<Rental[]>("/rentals", c.token);
  return (
    <section className="section">
      <h1>My requests</h1>
      <p className="lead">Everything you need for what comes next.</p>
      <RequestList items={items} />
    </section>
  );
}
