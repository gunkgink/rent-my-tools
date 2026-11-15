import Link from "@/components/Link";
import { rentalForViewer } from "@/lib/rentals";
import DeleteButton from "@/components/DeleteButton";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { current: c, rental: r } = await rentalForViewer(id);
  const back = c.user.role === "admin" ? "/admin/requests" : "/requests";
  return (
    <section className="section">
      <Link prefetch={false} href={back}>
        Back to {c.user.role === "admin" ? "all" : "my"} requests
      </Link>
      {(await searchParams).saved && (
        <p className="notice" role="status">
          Rental request saved.
        </p>
      )}
      <h1>{r.equipment?.name || "Equipment unavailable"}</h1>
      <div className="panel">
        <p className="muted">Request reference: {r._id}</p>
        {r.equipment?.isActive === false && (
          <p className="notice">
            Equipment removed. Choose an active item to save further edits.
          </p>
        )}
        <dl>
          <dt>Quantity</dt>
          <dd>{r.quantity} units</dd>
          <dt>Start date</dt>
          <dd>{r.startDate.slice(0, 10)}</dd>
          <dt>Return date</dt>
          <dd>{r.returnDate.slice(0, 10)}</dd>
          {c.user.role === "admin" && (
            <>
              <dt>Requester</dt>
              <dd>
                {r.user?.name}
                <br />
                {r.user?.email}
                <br />
                {r.user?.tel}
              </dd>
            </>
          )}
        </dl>
        <div className="actions">
          <Link
            prefetch={false}
            className="button"
            href={"/requests/" + id + "/edit"}
          >
            Edit request
          </Link>
          <DeleteButton kind="rentals" id={id} destination={back} />
        </div>
      </div>
    </section>
  );
}
