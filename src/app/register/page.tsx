import AuthForm from "@/components/AuthForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  return <AuthForm register callback={(await searchParams).callbackUrl} />;
}
