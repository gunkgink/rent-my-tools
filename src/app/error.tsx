"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="empty">
      <h1>The service is unavailable.</h1>
      <p>
        Check that the backend is running and connected to its database, then
        try again.
      </p>
      <button onClick={reset}>Try again</button>
    </section>
  );
}
