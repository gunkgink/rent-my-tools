import { requireUser } from "@/lib/auth";
import { api } from "@/lib/api";
import { Equipment } from "@/lib/types";
import RecordForm from "@/components/RecordForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ equipment?: string }>;
}) {
  const current = await requireUser("member");
  const items = await api<Equipment[]>("/equipment");
  return (
    <section className="section">
      <h1>Request equipment</h1>
      <RecordForm
        owner={current.user._id}
        kind="rentals"
        items={items}
        selected={(await searchParams).equipment}
      />
    </section>
  );
}
