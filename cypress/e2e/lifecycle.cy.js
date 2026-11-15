const equipmentName = "Cypress equipment " + Date.now();
const date = (n) =>
  new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
function login(email, password) {
  cy.visit("/login");
  cy.get("[name=email]").type(email);
  cy.get("[name=password]").type(password, { log: false });
  cy.contains("button", "Log in").click();
  cy.location("pathname").should("eq", "/equipment");
}
describe("Real supplied API and disposable MongoDB", () => {
  it("member creates, edits and deletes a request without reducing stock", () => {
    cy.task("accounts").then(({ password }) =>
      login("alex@example.test", password),
    );
    cy.contains("a", "Mirrorless camera kit").click();
    cy.contains("5 units available");
    cy.contains("a", "Request equipment").click();
    cy.get("input[type=number]").clear().type("2");
    cy.get("input[type=date]").eq(0).type(date(2));
    cy.get("input[type=date]").eq(1).type(date(9));
    cy.contains("button", "Send rental request").click();
    cy.contains("Rental request saved.");
    cy.request("/api/auth/session")
      .its("body")
      .should("not.have.property", "backendToken");
    cy.contains("a", "Edit request").click();
    cy.get("input[type=number]").clear().type("1");
    cy.contains("button", "Save changes").click();
    cy.contains("dd", "1 units");
    cy.contains("button", "Delete request").click();
    cy.get("dialog").should("be.visible");
    cy.contains("button", "Keep request").click();
    cy.contains("button", "Delete request").click();
    cy.get("dialog[open]").contains("button", "Confirm deletion").click();
    cy.location("pathname").should("eq", "/requests");
    cy.visit("/equipment");
    cy.contains("a", "Mirrorless camera kit").click();
    cy.contains("5 units available");
  });
  it("admin manages equipment and cannot create member requests", () => {
    cy.task("accounts").then(({ password }) =>
      login("admin@example.test", password),
    );
    cy.visit("/admin/equipment/new");
    cy.get("input[name=name]").type(equipmentName);
    cy.get("[name=category]").type("Accessories");
    cy.get("textarea[name=description]").type(
      "A disposable integration-test equipment record.",
    );
    cy.get("[name=quantity]").clear().type("2");
    cy.get("[name=rentalRate]").clear().type("20");
    cy.contains("button", "Add equipment").click();
    cy.contains("h1", equipmentName);
    cy.contains("a", "Edit equipment").click();
    cy.get("[name=quantity]").clear().type("0");
    cy.contains("button", "Save changes").click();
    cy.contains("0 units available");
    cy.visit("/admin/equipment");
    cy.contains("article", equipmentName).within(() =>
      cy.contains("button", "Remove equipment").click(),
    );
    cy.get("dialog[open]").contains("button", "Confirm deletion").click();
    cy.contains(equipmentName).should("not.exist");
    cy.visit("/requests/new");
    cy.location("pathname").should("eq", "/forbidden");
  });
});
