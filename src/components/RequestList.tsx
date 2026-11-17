import Link from "@/components/Link";
import { Rental } from "@/lib/types";
export default function RequestList({
  items,
  admin = false,
}: {
  items: Rental[];
  admin?: boolean;
}) {
  return items.length ? (
    <div className="records">
      {items.map((r) => (
        <article key={r._id} className="record">
          <div>
            <p className="muted">{r.equipment?.category || "Equipment"}</p>
            <h2>
              <Link prefetch={false} href={"/requests/" + r._id}>
                {r.equipment?.name || "Equipment unavailable"}
              </Link>
            </h2>
            {admin && (
              <p>
                {r.user?.name || "Requester unavailable"}
                <br />
                <small>{r.user?.email}</small>
              </p>
            )}
          </div>
          <p>
            <small>Quantity</small>
            <br />
            {r.quantity} units
          </p>
          <p>
            <small>Start date</small>
            <br />
            {r.startDate.slice(0, 10)}
          </p>
          <p>
            <small>Return date</small>
            <br />
            {r.returnDate.slice(0, 10)}
          </p>
          <Link
            prefetch={false}
            className="button secondary small"
            href={"/requests/" + r._id}
          >
            View request
          </Link>
        </article>
      ))}
    </div>
  ) : (
    <section className="empty">
      <h2>No rental requests yet.</h2>
      <Link prefetch={false} href="/equipment">
        Browse equipment
      </Link>
    </section>
  );
}
