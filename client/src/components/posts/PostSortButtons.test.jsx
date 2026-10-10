import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import PostSortButtons from "./PostSortButtons";

describe("PostSortButtons", () => {
  it("shows the three sort options", () => {
    renderWithProviders(<PostSortButtons value="newest" onChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Newest" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Most liked" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Most commented" })).toBeInTheDocument();
  });

  it("calls onChange with the chosen sort", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<PostSortButtons value="newest" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Most liked" }));

    expect(onChange).toHaveBeenCalledWith("likes");
  });

  it("sends the matching value for each button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<PostSortButtons value="newest" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Most commented" }));
    await user.click(screen.getByRole("button", { name: "Newest" }));

    expect(onChange).toHaveBeenNthCalledWith(1, "comments");
    expect(onChange).toHaveBeenNthCalledWith(2, "newest");
  });
});
