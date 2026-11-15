/* Disposable development database and the unmodified course API. Never uses a shared database. */
const { createRequire } = require("module");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const local = path.resolve(__dirname, "../runtime/backend");
const backend = fs.existsSync(local)
  ? local
  : path.resolve(__dirname, "../../tmp/backend-reference");
const load = createRequire(path.join(backend, "package.json"));
(async () => {
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const mongo = await MongoMemoryServer.create({
    instance: { dbName: "rent_my_tools_disposable" },
  });
  process.chdir(backend);
  process.env.MONGO_URI = mongo.getUri();
  process.env.JWT_SECRET = crypto.randomBytes(48).toString("hex");
  process.env.PORT = "5000";
  process.env.FRONTEND_URL = "http://localhost:3000";
  process.env.JWT_EXPIRE = "1d";
  process.env.JWT_COOKIE_EXPIRE = "1";
  const { server } = load("./server.js");
  const password = crypto.randomBytes(12).toString("base64url");
  async function request(route, body, token) {
    const r = await fetch("http://localhost:5000/api/v1" + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: "Bearer " + token } : {}),
      },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    if (!j.success) throw Error("Development seed failed: " + r.status);
    return j.data;
  }
  const accounts = [];
  for (const [name, role, email] of [
    ["Library Admin", "admin", "admin@example.test"],
    ["Alex Student", "member", "alex@example.test"],
    ["Sam Student", "member", "sam@example.test"],
  ])
    accounts.push(
      await request("/auth/register", {
        name,
        role,
        email,
        tel: "+66 2000 0000",
        password,
      }),
    );
  const equipment = [
    [
      "Mirrorless camera kit",
      "Camera",
      5,
      250,
      "A compact camera with a standard lens for photography projects.",
    ],
    [
      "Portable projector",
      "Projector",
      2,
      180,
      "Portable projector for workshop presentations.",
    ],
    [
      "Workshop notebook",
      "Computer",
      4,
      300,
      "A notebook computer for workshops and project work.",
    ],
    [
      "Tripod",
      "Camera",
      8,
      60,
      "Adjustable tripod for stable camera placement.",
    ],
    [
      "Badminton racket",
      "Sports",
      6,
      40,
      "A single badminton racket for short sports sessions.",
    ],
    [
      "Basketball",
      "Sports",
      0,
      30,
      "Basketball for group practice. Currently unavailable.",
    ],
    [
      "HDMI presentation kit",
      "Accessories",
      3,
      25,
      "HDMI cable and adapter kit for presentations.",
    ],
    [
      "USB microphone",
      "Audio",
      2,
      90,
      "USB microphone for recorded presentations and interviews.",
    ],
  ];
  for (const [name, category, quantity, rentalRate, description] of equipment)
    await request(
      "/equipment",
      { name, category, quantity, rentalRate, description },
      accounts[0].token,
    );
  const output = path.resolve(__dirname, "../runtime");
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(
    path.join(output, "local-accounts.json"),
    JSON.stringify(
      { password, accounts: accounts.map(({ token, ...a }) => a) },
      null,
      2,
    ),
  );
  console.log(
    "Disposable course backend ready at localhost:5000. Synthetic login credentials: runtime/local-accounts.json (ignored by Git).",
  );
  async function stop() {
    server.close();
    await mongo.stop();
    process.exit();
  }
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
