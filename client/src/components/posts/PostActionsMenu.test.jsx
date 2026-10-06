import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import PostActionsMenu from "./PostActionsMenu";

const openMenu = async (user) => {
  await user.click(screen.getByRole("button", { name: "Post actions" }));
};

describe("PostActionsMenu", () => {
  it("shows Edit and Delete after opening the menu", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PostActionsMenu onEdit={vi.fn()} onDelete={vi.fn()} />);

    await openMenu(user);

    expect(await screen.findByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("calls onEdit when Edit is chosen", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderWithProviders(<PostActionsMenu onEdit={onEdit} onDelete={vi.fn()} />);

    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when Delete is chosen", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderWithProviders(<PostActionsMenu onEdit={vi.fn()} onDelete={onDelete} />);

    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
