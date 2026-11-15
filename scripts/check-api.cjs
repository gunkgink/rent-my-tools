const fs = require("fs");
const assert = require("node:assert/strict");
const { password } = JSON.parse(
  fs.readFileSync("runtime/local-accounts.json", "utf8"),
);
const base = "http://localhost:5000/api/v1";
let passed = 0;
async function call(path, method = "GET", body, token, status = 200) {
  const r = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const j = await r.json();
  assert.equal(
    r.status,
    status,
    `${method} ${path}: expected ${status}, got ${r.status}`,
  );
  passed++;
  return j.data;
}
const date = (n) =>
  new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
(async () => {
  const [a, b, admin] = await Promise.all(
    ["alex", "sam", "admin"].map((name) =>
      call("/auth/login", "POST", { email: name + "@example.test", password }),
    ),
  );
  const list = await call("/equipment");
  const item = list.find((x) => x.name === "Mirrorless camera kit");
  await call("/rentals", "GET", undefined, undefined, 401);
  await call("/equipment", "POST", { name: "Denied" }, a.token, 403);
  const body = {
    equipment: item._id,
    quantity: 2,
    startDate: date(2),
    returnDate: date(9),
  };
  const r = await call("/rentals", "POST", body, a.token, 201);
  await call("/rentals/" + r._id, "GET", undefined, b.token, 403);
  await call("/rentals/" + r._id, "PUT", body, b.token, 403);
  await call("/rentals/" + r._id, "DELETE", undefined, b.token, 403);
  const own = await call("/rentals", "GET", undefined, b.token);
  assert(!own.some((x) => x._id === r._id));
  passed++;
  await call("/rentals", "POST", body, admin.token, 403);
  for (const patch of [
    { quantity: 4 },
    { quantity: 0 },
    { quantity: 1.5 },
    { startDate: date(-1) },
    { returnDate: date(1) },
    { returnDate: date(10) },
  ])
    await call("/rentals", "POST", { ...body, ...patch }, a.token, 400);
  const same = await call(
    "/rentals",
    "POST",
    { ...body, returnDate: body.startDate },
    a.token,
    201,
  );
  const after = await call("/equipment/" + item._id);
  assert.equal(after.quantity, item.quantity);
  passed++;
  const all = await call("/rentals", "GET", undefined, admin.token);
  assert(all.some((x) => x._id === r._id));
  passed++;
  const updated = await call(
    "/rentals/" + r._id,
    "PUT",
    { quantity: 1 },
    admin.token,
  );
  assert.equal(updated.quantity, 1);
  passed++;
  await call("/rentals/" + r._id, "DELETE", undefined, admin.token);
  await call("/rentals/" + same._id, "DELETE", undefined, a.token);
  fs.mkdirSync("docs/evidence", { recursive: true });
  fs.writeFileSync(
    "docs/evidence/api-results.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        environment: "unmodified supplied API + disposable real MongoDB",
        passedAssertions: passed,
        scenarios: [
          "member ownership GET/PUT/DELETE",
          "admin edit/delete",
          "member-only creation",
          "UTC date and 7-day boundary",
          "quantity boundaries",
          "same-day allowed",
          "stock unchanged",
        ],
        status: "passed",
      },
      null,
      2,
    ),
  );
  console.log(`${passed} real-API assertions passed.`);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
