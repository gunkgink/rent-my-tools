import { Suspense } from "react";
import { api } from "@/lib/api";
import { Equipment } from "@/lib/types";
import Catalog from "@/components/Catalog";
export const dynamic = "force-dynamic";
export default async function Page() {
  const items = await api<Equipment[]>("/equipment");
  return (
    <section className="section">
      <p className="eyebrow">Find what you need</p>
      <h1>Browse equipment</h1>
      <p className="lead">
        Good equipment. Short commitments. More possibilities.
      </p>
      <Suspense fallback={<p>Loading filters…</p>}>
        <Catalog items={items} />
      </Suspense>
    </section>
  );
}
