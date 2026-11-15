import AuthForm from "@/components/AuthForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; created?: string }>;
}) {
  const p = await searchParams;
  return (
    <>
      {p.created && (
        <p role="status" className="notice">
          Account created. Log in to continue.
        </p>
      )}
      <AuthForm callback={p.callbackUrl} />
    </>
  );
}
