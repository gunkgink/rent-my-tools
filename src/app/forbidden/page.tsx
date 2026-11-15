import Link from "@/components/Link";
export default function Page() {
  return (
    <section className="empty">
      <h1>You do not have access to this page.</h1>
      <Link prefetch={false} href="/equipment">
        Browse equipment
      </Link>
    </section>
  );
}
