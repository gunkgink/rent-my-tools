import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { identity } from "@/lib/auth";
import { Equipment } from "@/lib/types";
import { money } from "@/lib/rules";
import EquipmentArt from "@/components/EquipmentArt";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();
  let item: Equipment;
  try {
    item = await api<Equipment>("/equipment/" + id);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
  const current = await identity();
  return (
    <section className="section">
      <Link prefetch={false} href="/equipment">
        Browse equipment / {item.category}
      </Link>
      <div className="detail">
        <div>
          <EquipmentArt
            category={item.category}
            name={item.name}
            image={item.image}
          />
          <h1>{item.name}</h1>
          <p className="lead">{item.description}</p>
        </div>
        <aside className="panel">
          <p>{item.category}</p>
          <h2>
            {money(item.rentalRate)}
            <small> / item / day</small>
          </h2>
          <p className="stock">{item.quantity} units available</p>
          <hr />
          <h3>Make it part of your project.</h3>
          <p>Request up to 3 units for up to 7 days.</p>
          {current?.user.role === "admin" ? (
            <Link
              prefetch={false}
              className="button"
              href={"/admin/equipment/" + id + "/edit"}
            >
              Edit equipment
            </Link>
          ) : item.quantity > 0 ? (
            <Link
              className="button"
              href={
                current
                  ? "/requests/new?equipment=" + id
                  : "/login?callbackUrl=" +
                    encodeURIComponent("/requests/new?equipment=" + id)
              }
            >
              {current ? "Request equipment" : "Log in to request"}
            </Link>
          ) : (
            <p className="notice">No units available</p>
          )}
          <p className="muted">
            Sending a request does not reserve equipment or reduce available
            stock.
          </p>
        </aside>
      </div>
    </section>
  );
}
