import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test/renderWithProviders";
import AdminUserList from "./AdminUserList";

const admin = {
  id: "admin-1",
  username: "george_p",
  first_name: "George",
  last_name: "Petrov",
  email: "george@example.com",
  is_admin: true,
  is_blocked: false,
};

const blockedUser = {
  id: "user-2",
  username: "maria_k",
  first_name: "Maria",
  last_name: "Koleva",
  email: "maria@example.com",
  is_admin: false,
  is_blocked: true,
};

const renderList = (props = {}) =>
  renderWithProviders(
    <AdminUserList
      users={[admin, blockedUser]}
      currentUserId="admin-1"
      onToggleBlock={vi.fn()}
      onToggleAdmin={vi.fn()}
      {...props}
    />,
  );

describe("AdminUserList", () => {
  it("shows a message when nobody matches the search", () => {
    renderList({ users: [] });

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("marks admins, blocked users and the current account", () => {
    renderList();

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Blocked")).toBeInTheDocument();
    expect(screen.getByText("You")).toBeInTheDocument();
  });

  it("doesn't let admins change their own account", () => {
    renderList();

    // Only the other user's two buttons are shown.
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("offers to unblock a blocked user", async () => {
    const user = userEvent.setup();
    const onToggleBlock = vi.fn();
    renderList({ onToggleBlock });

    await user.click(screen.getByRole("button", { name: "Unblock" }));

    expect(onToggleBlock).toHaveBeenCalledWith(blockedUser);
  });

  it("offers to make a regular user an admin", async () => {
    const user = userEvent.setup();
    const onToggleAdmin = vi.fn();
    renderList({ onToggleAdmin });

    await user.click(screen.getByRole("button", { name: "Make admin" }));

    expect(onToggleAdmin).toHaveBeenCalledWith(blockedUser);
  });
});
