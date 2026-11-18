"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/Link";
import DraftProvider, { useDraft } from "./DraftProvider";
import { mutate } from "@/actions";
import { Equipment, Rental } from "@/lib/types";
import { estimate, money, rentalError, todayUTC } from "@/lib/rules";
// Shrinks an uploaded picture to at most 1000px and returns it as a JPEG data URL,
// small enough to send with the equipment form.
async function toPhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw Error("Choose an image file.");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(Error("That image could not be read."));
      i.src = url;
    });
    const scale = Math.min(1, 1000 / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw Error("This browser cannot process images.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let quality = 0.82;
    let data = canvas.toDataURL("image/jpeg", quality);
    while (data.length > 650000 && quality > 0.4) {
      quality -= 0.1;
      data = canvas.toDataURL("image/jpeg", quality);
    }
    if (data.length > 900000)
      throw Error("That image is too large. Try a smaller picture.");
    return data;
  } finally {
    URL.revokeObjectURL(url);
  }
}
function Form({
  kind,
  items = [],
  equipment,
  rental,
  selected = "",
  owner = "",
}: {
  owner?: string;
  kind: "equipment" | "rentals";
  items?: Equipment[];
  equipment?: Equipment;
  rental?: Rental;
  selected?: string;
}) {
  const { draft, dispatch, save, clear } = useDraft();
  const [restored] = useState(() =>
    !rental &&
    kind === "rentals" &&
    draft.owner === owner &&
    Date.now() - draft.updated < 86400000
      ? draft
      : null,
  );
  const router = useRouter(),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [itemId, setItemId] = useState(
      rental?.equipment?._id ||
        selected ||
        restored?.equipment ||
        items[0]?._id ||
        "",
    ),
    [q, setQ] = useState(rental?.quantity || restored?.quantity || 1),
    [start, setStart] = useState(
      rental?.startDate.slice(0, 10) || restored?.start || "",
    ),
    [end, setEnd] = useState(
      rental?.returnDate.slice(0, 10) || restored?.end || "",
    );
  const [image, setImage] = useState(equipment?.image || ""),
    [imageError, setImageError] = useState(""),
    fileInput = useRef<HTMLInputElement>(null);
  const item = items.find((e) => e._id === itemId);
  const id = equipment?._id || rental?._id;
  const cancel =
    kind === "equipment"
      ? "/admin/equipment"
      : id
        ? "/requests/" + id
        : "/requests";
  const rule = item
    ? rentalError(q, start, end, item.quantity)
    : "Choose equipment.";
  return (
    <div className="detail">
      <form
        className="panel"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          const f = new FormData(e.currentTarget);
          const values: Record<string, unknown> =
            kind === "equipment"
              ? {
                  name: f.get("name"),
                  category: f.get("category"),
                  description: f.get("description"),
                  quantity: Number(f.get("quantity")),
                  rentalRate: Number(f.get("rentalRate")),
                  image,
                }
              : {
                  equipment: itemId,
                  quantity: q,
                  startDate: start,
                  returnDate: end,
                };
          const r = await mutate(
            kind,
            id ? "update" : "create",
            id || "",
            values,
          );
          if (r.ok) {
            dispatch(clear());
            router.push(
              kind === "equipment"
                ? "/equipment/" + r.id
                : "/requests/" + r.id + "?saved=1",
            );
            router.refresh();
          } else {
            setError(r.error || "Could not save.");
            setBusy(false);
          }
        }}
      >
        {error && (
          <p role="alert" className="notice error">
            {error}
          </p>
        )}
        {kind === "equipment" ? (
          <>
            <label>
              Name
              <input name="name" required defaultValue={equipment?.name} />
            </label>
            <label>
              Category
              <input
                name="category"
                required
                defaultValue={equipment?.category}
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                required
                rows={5}
                defaultValue={equipment?.description}
              />
            </label>
            <label>
              Available quantity
              <input
                type="number"
                name="quantity"
                required
                min="0"
                step="1"
                defaultValue={equipment?.quantity ?? 0}
              />
            </label>
            <label>
              Rate per item per day (THB)
              <input
                type="number"
                name="rentalRate"
                required
                min="0"
                step="0.01"
                defaultValue={equipment?.rentalRate ?? 0}
              />
            </label>
            <fieldset
              style={{
                border: 0,
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 8,
              }}
            >
              <legend style={{ fontWeight: 600, marginBottom: 8 }}>
                Equipment photo (optional)
              </legend>
              {image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Selected equipment photo"
                    style={{
                      width: "100%",
                      maxWidth: 320,
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                    }}
                  />
                </>
              ) : (
                <small>
                  No photo yet. The category illustration is shown instead.
                </small>
              )}
              <input
                ref={fileInput}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                hidden
                onChange={async (e) => {
                  const file = e.currentTarget.files?.[0];
                  e.currentTarget.value = "";
                  if (!file) return;
                  setImageError("");
                  try {
                    setImage(await toPhoto(file));
                  } catch (err) {
                    setImageError(
                      err instanceof Error ? err.message : "Upload failed.",
                    );
                  }
                }}
              />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="secondary small"
                  onClick={() => fileInput.current?.click()}
                >
                  {image ? "Change image" : "Upload image"}
                </button>
                {image ? (
                  <button
                    type="button"
                    className="secondary small"
                    onClick={() => setImage("")}
                  >
                    Remove image
                  </button>
                ) : null}
              </div>
              {imageError ? (
                <small role="alert" style={{ color: "var(--danger)" }}>
                  {imageError}
                </small>
              ) : null}
            </fieldset>
          </>
        ) : (
          <>
            <label>
              Equipment
              <select
                value={itemId}
                onChange={(e) => {
                  setItemId(e.target.value);
                  if (!id)
                    dispatch(
                      save({
                        owner,
                        equipment: e.target.value,
                        quantity: q,
                        start: start,
                        end: end,
                        updated: Date.now(),
                      }),
                    );
                }}
                required
              >
                {!item && <option value="">Choose active equipment</option>}
                {items.map((i) => (
                  <option value={i._id} key={i._id}>
                    {i.name} ({i.quantity} available)
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantity
              <input
                type="number"
                required
                min="1"
                max={Math.min(3, item?.quantity || 0)}
                step="1"
                value={q || ""}
                onChange={(e) => {
                  setQ(Number(e.target.value));
                  if (!id)
                    dispatch(
                      save({
                        owner,
                        equipment: itemId,
                        quantity: Number(e.target.value),
                        start: start,
                        end: end,
                        updated: Date.now(),
                      }),
                    );
                }}
              />
            </label>
            <div className="date-pair">
              <label>
                Start date
                <input
                  type="date"
                  required
                  value={start}
                  min={todayUTC()}
                  onChange={(e) => {
                    setStart(e.target.value);
                    if (!id)
                      dispatch(
                        save({
                          owner,
                          equipment: itemId,
                          quantity: q,
                          start: e.target.value,
                          end: end,
                          updated: Date.now(),
                        }),
                      );
                  }}
                />
              </label>
              <label>
                Return date
                <input
                  type="date"
                  required
                  value={end}
                  min={start || todayUTC()}
                  onChange={(e) => {
                    setEnd(e.target.value);
                    if (!id)
                      dispatch(
                        save({
                          owner,
                          equipment: itemId,
                          quantity: q,
                          start: start,
                          end: e.target.value,
                          updated: Date.now(),
                        }),
                      );
                  }}
                />
              </label>
            </div>
            <p className="muted">
              Rental dates use UTC. Earliest start: {todayUTC()}. Same-day
              rentals are allowed; maximum duration is 7 days.
            </p>
            {rental && rental.startDate.slice(0, 10) < todayUTC() && (
              <p className="notice">
                This request starts in the past. Choose a new start date to save
                changes.
              </p>
            )}
          </>
        )}
        <div className="actions">
          <button disabled={busy}>
            {busy
              ? "Saving…"
              : id
                ? "Save changes"
                : kind === "equipment"
                  ? "Add equipment"
                  : "Send rental request"}
          </button>
          <Link prefetch={false} href={cancel}>
            Cancel
          </Link>
        </div>
      </form>
      <aside className="panel summary">
        <h2>{kind === "equipment" ? "Equipment details" : "Your request"}</h2>
        {kind === "equipment" ? (
          <p>
            Everyone can browse active equipment. Removing equipment preserves
            existing rental request history.
          </p>
        ) : (
          <>
            <h3>{item?.name || "Choose equipment"}</h3>
            <p>
              {q} units · {item ? money(item.rentalRate) : "—"} / item / day
            </p>
            <p>
              {start || "Start date"} — {end || "Return date"}
            </p>
            {rule ? (
              <p className="notice">{rule}</p>
            ) : (
              <>
                <p>Estimated cost</p>
                <strong className="price">
                  {money(estimate(q, start, end, item!.rentalRate))}
                </strong>
              </>
            )}
            <p className="muted">
              Estimate only, using at least one billable day. No payment
              collected.
            </p>
            <hr />
            <p>
              Sending a request does not reserve equipment or reduce available
              stock.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

export default function RecordForm(props: Parameters<typeof Form>[0]) {
  return (
    <DraftProvider>
      <Form {...props} />
    </DraftProvider>
  );
}
