"use client";
import Link from "@/components/Link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Equipment } from "@/lib/types";
import { money } from "@/lib/rules";
import EquipmentArt from "./EquipmentArt";
export default function Catalog({ items }: { items: Equipment[] }) {
  const params = useSearchParams(),
    router = useRouter();
  const [q, setQ] = useState(params.get("q") || "");
  const category = params.get("category") || "";
  const available = params.get("available") === "true",
    sort = params.get("sort") || "name";
  function change(key: string, value: string) {
    const p = new URLSearchParams(params);
    if (value) p.set(key, value);
    else p.delete(key);
    router.replace("/equipment?" + p.toString(), { scroll: false });
  }
  const filtered = items
    .filter(
      (e) =>
        (!category || e.category === category) &&
        (!available || e.quantity > 0) &&
        `${e.name} ${e.category} ${e.description}`
          .toLowerCase()
          .includes(q.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.rentalRate - b.rentalRate
        : sort === "high"
          ? b.rentalRate - a.rentalRate
          : a.name.localeCompare(b.name),
    );
  return (
    <>
      <div className="toolbar">
        <label>
          Search equipment
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
            }}
            onBlur={() => change("q", q)}
            placeholder="Try camera, projector, notebook…"
          />
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(e) => change("sort", e.target.value)}>
            <option value="name">Name A–Z</option>
            <option value="low">Rate low–high</option>
            <option value="high">Rate high–low</option>
          </select>
        </label>
      </div>
      <div className="filters">
        <button
          className={!category ? "chip selected" : "chip"}
          onClick={() => change("category", "")}
        >
          All equipment
        </button>
        {Array.from(new Set(items.map((e) => e.category))).map((c) => (
          <button
            key={c}
            className={category === c ? "chip selected" : "chip"}
            onClick={() => change("category", c)}
          >
            {c}
          </button>
        ))}
        <label className="check">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) =>
              change("available", e.target.checked ? "true" : "")
            }
          />{" "}
          Available only
        </label>
      </div>
      <p className="muted" aria-live="polite">
        {filtered.length} equipment items
      </p>
      <div className="grid">
        {filtered.map((e) => (
          <article className="tile" key={e._id}>
            <Link prefetch={false} href={"/equipment/" + e._id}>
              <EquipmentArt category={e.category} name={e.name} />
              <p className="muted">{e.category}</p>
              <h2>{e.name}</h2>
            </Link>
            <div className="tile-bottom">
              <strong>
                {money(e.rentalRate)}
                <small> / item / day</small>
              </strong>
              <span>
                {e.quantity > 0 ? `${e.quantity} available` : "None available"}
              </span>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <section className="empty">
          <h2>
            {items.length
              ? "No equipment matches these filters."
              : "No equipment listed yet."}
          </h2>
          <button
            onClick={() => {
              setQ("");
              router.replace("/equipment");
            }}
          >
            Clear filters
          </button>
        </section>
      )}
    </>
  );
}
