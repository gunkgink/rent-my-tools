import { rentalForViewer } from "@/lib/rentals";
import { api } from "@/lib/api";
import { Equipment } from "@/lib/types";
import RecordForm from "@/components/RecordForm";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { current: c, rental: r } = await rentalForViewer(id);
  const items = await api<Equipment[]>("/equipment");
  return (
    <section className="section">
      <h1>Edit rental request</h1>
      {c.user.role === "admin" && (
        <p>
          Requester: {r.user?.name} ({r.user?.email})
        </p>
      )}
      <RecordForm kind="rentals" items={items} rental={r} />
    </section>
  );
}
