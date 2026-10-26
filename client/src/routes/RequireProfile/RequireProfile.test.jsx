import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../../test/renderWithProviders";
import { ProfileContext } from "../../context/ProfileContext";
import RequireProfile from "./RequireProfile";

const renderAt = (profileState) =>
  renderWithProviders(
    <ProfileContext.Provider
      value={{ refreshProfile: vi.fn(), error: null, ...profileState }}
    >
      <Routes>
        <Route element={<RequireProfile />}>
          <Route path="/feed" element={<p>Feed page</p>} />
        </Route>
        <Route path="/complete-profile" element={<p>Complete profile</p>} />
      </Routes>
    </ProfileContext.Provider>,
    { route: "/feed" },
  );

describe("RequireProfile", () => {
  it("shows a loading state while the profile loads", () => {
    renderAt({ profile: null, loading: true });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("sends users without a profile to complete it", () => {
    renderAt({ profile: null, loading: false });

    expect(screen.getByText("Complete profile")).toBeInTheDocument();
    expect(screen.queryByText("Feed page")).not.toBeInTheDocument();
  });

  it("shows the page to users with a profile", () => {
    renderAt({ profile: { id: "user-1" }, loading: false });

    expect(screen.getByText("Feed page")).toBeInTheDocument();
  });

  it("offers a retry when the profile could not be loaded", () => {
    renderAt({ profile: null, loading: false, error: { message: "down" } });

    expect(
      screen.getByText("Could not load your profile."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });
});
