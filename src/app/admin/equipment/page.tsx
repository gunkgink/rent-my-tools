import Link from "@/components/Link";
import { api } from "@/lib/api";
import { Equipment } from "@/lib/types";
import { money } from "@/lib/rules";
import DeleteButton from "@/components/DeleteButton";
export default async function Page() {
  const items = await api<Equipment[]>("/equipment");
  return (
    <section className="section">
      <div className="section-title">
        <h1>Manage equipment</h1>
        <Link prefetch={false} className="button" href="/admin/equipment/new">
          Add equipment
        </Link>
      </div>
      <div className="records">
        {items.map((e) => (
          <article className="record" key={e._id}>
            <div>
              <p className="muted">{e.category}</p>
              <h2>{e.name}</h2>
            </div>
            <p>{e.quantity} available</p>
            <p>{money(e.rentalRate)} / day</p>
            <Link prefetch={false} href={"/admin/equipment/" + e._id + "/edit"}>
              Edit equipment
            </Link>
            <DeleteButton
              kind="equipment"
              id={e._id}
              destination="/admin/equipment"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
