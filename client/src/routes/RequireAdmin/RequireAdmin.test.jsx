import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../../test/renderWithProviders";
import { ProfileContext } from "../../context/ProfileContext";
import RequireAdmin from "./RequireAdmin";

const renderAt = (profile) =>
  renderWithProviders(
    <ProfileContext.Provider
      value={{ profile, loading: false, error: null, refreshProfile: vi.fn() }}
    >
      <Routes>
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<p>Admin panel</p>} />
        </Route>
        <Route path="/feed" element={<p>Feed page</p>} />
      </Routes>
    </ProfileContext.Provider>,
    { route: "/admin" },
  );

describe("RequireAdmin", () => {
  it("shows the admin panel to admins", () => {
    renderAt({ id: "admin-1", is_admin: true });

    expect(screen.getByText("Admin panel")).toBeInTheDocument();
  });

  it("sends everyone else back to the feed", () => {
    renderAt({ id: "user-1", is_admin: false });

    expect(screen.getByText("Feed page")).toBeInTheDocument();
    expect(screen.queryByText("Admin panel")).not.toBeInTheDocument();
  });
});
