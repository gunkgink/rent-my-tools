import { dateValue, rentalError, safeReturn, estimate } from "@/lib/rules";
describe("rental rules match backend UTC semantics", () => {
  test.each([
    ["2026-12-01", "2026-12-01", true],
    ["2026-12-01", "2026-12-08", true],
    ["2026-12-01", "2026-12-09", false],
    ["2026-12-01", "2026-11-30", false],
    ["2026-11-30", "2026-12-01", false],
  ])("dates %s to %s valid=%s", (a, b, valid) =>
    expect(!rentalError(1, a, b, 5, "2026-12-01")).toBe(valid),
  );
  test.each([0, -1, 4, 1.5, NaN])("rejects quantity %s", (q) =>
    expect(
      rentalError(q, "2026-12-01", "2026-12-02", 5, "2026-12-01"),
    ).not.toBe(""),
  );
  test("stock is independent maximum", () =>
    expect(
      rentalError(3, "2026-12-01", "2026-12-02", 2, "2026-12-01"),
    ).not.toBe(""));
  test.each(["2026-02-30", "2026-13-01", "garbage", "2026-1-01"])(
    "rejects noncalendar date %s",
    (d) => expect(dateValue(d)).toBeNaN(),
  );
  test("leap day is real", () => expect(dateValue("2028-02-29")).not.toBeNaN());
  test.each([
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/api/auth/signout",
    "/login",
  ])("blocks callback %s", (p) => expect(safeReturn(p)).toBe("/equipment"));
  test("keeps selected item callback", () =>
    expect(safeReturn("/requests/new?equipment=abc")).toBe(
      "/requests/new?equipment=abc",
    ));
  test("same-day estimate uses one day, no billing implication", () =>
    expect(estimate(2, "2026-12-01", "2026-12-01", 250)).toBe(500));
});
