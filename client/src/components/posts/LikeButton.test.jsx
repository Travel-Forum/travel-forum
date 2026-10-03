import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import LikeButton from "./LikeButton";

describe("LikeButton", () => {
  it("shows the like count", () => {
    renderWithProviders(<LikeButton liked={false} count={7} onToggle={() => {}} />);

    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("offers to like a post that is not liked yet", () => {
    renderWithProviders(<LikeButton liked={false} count={0} onToggle={() => {}} />);

    const button = screen.getByRole("button", { name: "Like" });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("offers to unlike a post that is already liked", () => {
    renderWithProviders(<LikeButton liked={true} count={1} onToggle={() => {}} />);

    const button = screen.getByRole("button", { name: "Unlike" });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    renderWithProviders(<LikeButton liked={false} count={0} onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { name: "Like" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
