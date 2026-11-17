/* Download the pinned public teaching API into ignored local runtime storage. */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const target = path.resolve(__dirname, "../runtime/backend");
if (fs.existsSync(target))
  throw Error(
    "runtime/backend already exists. Preserve it and inspect before re-running setup.",
  );
fs.mkdirSync(path.dirname(target), { recursive: true });
execFileSync(
  "git",
  [
    "clone",
    "https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent.git",
    target,
  ],
  { stdio: "inherit" },
);
execFileSync(
  "git",
  ["-C", target, "checkout", "be18df9967be7e0a742b5a5ae25f07966dc4e1d4"],
  { stdio: "inherit" },
);
const npmCli = process.env.npm_execpath;
if (!npmCli) throw Error("Run this script using npm run backend:setup.");
execFileSync(process.execPath, [npmCli, "ci", "--prefix", target], {
  stdio: "inherit",
});
console.log(
  "Pinned course backend installed in runtime/backend. Start with npm run backend:dev.",
);
