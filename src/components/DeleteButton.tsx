"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "@/actions";
export default function DeleteButton({
  kind,
  id,
  destination,
}: {
  kind: "equipment" | "rentals";
  id: string;
  destination: string;
}) {
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialog = useRef<HTMLDialogElement>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    router = useRouter();
  return (
    <>
      <button disabled={!ready} className="danger" onClick={() => dialog.current?.showModal()}>
        {kind === "equipment" ? "Remove equipment" : "Delete request"}
      </button>
      <dialog ref={dialog}>
        <h2>
          {kind === "equipment"
            ? "Remove this equipment?"
            : "Delete this rental request?"}
        </h2>
        <p>
          {kind === "equipment"
            ? "Equipment will no longer appear in browsing. Existing requests remain."
            : "This removes the request. It cannot be restored."}
        </p>
        {error && <p role="alert">{error}</p>}
        <div className="actions">
          <button className="secondary" onClick={() => dialog.current?.close()}>
            Keep {kind === "equipment" ? "equipment" : "request"}
          </button>
          <button
            disabled={busy}
            className="danger"
            onClick={async () => {
              setBusy(true);
              const r = await mutate(kind, "delete", id, {});
              if (r.ok) {
                dialog.current?.close();
                router.push(destination);
                router.refresh();
              } else {
                setError(r.error || "Try again");
                setBusy(false);
              }
            }}
          >
            {busy ? "Removing…" : "Confirm deletion"}
          </button>
        </div>
      </dialog>
    </>
  );
}
