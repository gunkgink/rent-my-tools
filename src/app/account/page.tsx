import { requireUser } from "@/lib/auth";
export default async function Page() {
  const { user } = await requireUser();
  return (
    <section className="section">
      <h1>Your account</h1>
      <dl className="panel">
        <dt>Name</dt>
        <dd>{user.name}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Telephone</dt>
        <dd>{user.tel}</dd>
        <dt>Role</dt>
        <dd>{user.role}</dd>
      </dl>
    </section>
  );
}
