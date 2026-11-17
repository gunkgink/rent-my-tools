import { render, screen, fireEvent } from "@testing-library/react";
import DeleteButton from "@/components/DeleteButton";
jest.mock("@/actions", () => ({ mutate: jest.fn() }));
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));
test("deletion requires explicit confirmation and explains permanence", () => {
  HTMLDialogElement.prototype.showModal = jest.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute("open", "");
  });
  render(<DeleteButton kind="rentals" id="test" destination="/requests" />);
  fireEvent.click(screen.getByRole("button", { name: "Delete request" }));
  expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  expect(screen.getByText(/cannot be restored/)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Keep request" }),
  ).toBeInTheDocument();
});
