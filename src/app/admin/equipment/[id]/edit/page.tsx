import RecordForm from "@/components/RecordForm";
import { api } from "@/lib/api";
import { Equipment } from "@/lib/types";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <section className="section">
      <h1>Edit equipment</h1>
      <RecordForm
        kind="equipment"
        equipment={await api<Equipment>("/equipment/" + (await params).id)}
      />
    </section>
  );
}
