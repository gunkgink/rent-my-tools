import Link from "@/components/Link";
export default function Missing() {
  return (
    <section className="empty">
      <h1>This item could not be found.</h1>
      <p>It may have been removed, or the link may be incomplete.</p>
      <Link prefetch={false} className="button" href="/equipment">
        Browse equipment
      </Link>
    </section>
  );
}
