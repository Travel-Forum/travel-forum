import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../test/renderWithProviders";
import { AuthContext } from "../context/AuthContext";
import GuestRoute from "./GuestRoute";

const renderAt = (route, auth) =>
  renderWithProviders(
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/signin" element={<p>Sign in page</p>} />
        </Route>
        <Route path="/feed" element={<p>Feed page</p>} />
      </Routes>
    </AuthContext.Provider>,
    { route },
  );

describe("GuestRoute", () => {
  it("shows a loading state while the session is being checked", () => {
    renderAt("/signin", { user: null, loading: true });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows the page to signed-out users", () => {
    renderAt("/signin", { user: null, loading: false });

    expect(screen.getByText("Sign in page")).toBeInTheDocument();
  });

  it("sends signed-in users to the feed", () => {
    renderAt("/signin", { user: { id: "user-1" }, loading: false });

    expect(screen.getByText("Feed page")).toBeInTheDocument();
    expect(screen.queryByText("Sign in page")).not.toBeInTheDocument();
  });
});
