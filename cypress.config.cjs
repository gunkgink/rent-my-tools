const { defineConfig } = require("cypress");
const fs = require("fs");
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    setupNodeEvents(on, config) {
      on("task", {
        accounts: () =>
          JSON.parse(fs.readFileSync("runtime/local-accounts.json", "utf8")),
      });
      on("after:run", (r) => {
        fs.mkdirSync("docs/evidence", { recursive: true });
        fs.writeFileSync(
          "docs/evidence/browser-results.json",
          JSON.stringify(
            {
              date: new Date().toISOString(),
              environment:
                "local production Next build + real supplied API + disposable MongoDB",
              passed: r.totalPassed,
              failed: r.totalFailed,
              total: r.totalTests,
            },
            null,
            2,
          ),
        );
      });
      return config;
    },
  },
  video: false,
  defaultCommandTimeout: 15000,
});

