import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../../test/renderWithProviders";
import { ProfileContext } from "../../context/ProfileContext";
import RequireNoProfile from "./RequireNoProfile";

const renderAt = (profileState) =>
  renderWithProviders(
    <ProfileContext.Provider
      value={{ refreshProfile: vi.fn(), error: null, ...profileState }}
    >
      <Routes>
        <Route element={<RequireNoProfile />}>
          <Route path="/complete-profile" element={<p>Complete profile</p>} />
        </Route>
        <Route path="/feed" element={<p>Feed page</p>} />
      </Routes>
    </ProfileContext.Provider>,
    { route: "/complete-profile" },
  );

describe("RequireNoProfile", () => {
  it("lets users without a profile complete it", () => {
    renderAt({ profile: null, loading: false });

    expect(screen.getByText("Complete profile")).toBeInTheDocument();
  });

  it("sends users who already have a profile to the feed", () => {
    renderAt({ profile: { id: "user-1" }, loading: false });

    expect(screen.getByText("Feed page")).toBeInTheDocument();
    expect(screen.queryByText("Complete profile")).not.toBeInTheDocument();
  });
});
