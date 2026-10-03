import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../test/renderWithProviders";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const renderAt = (route, auth) =>
  renderWithProviders(
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<p>Feed page</p>} />
        </Route>
        <Route path="/signin" element={<p>Sign in page</p>} />
      </Routes>
    </AuthContext.Provider>,
    { route },
  );

describe("ProtectedRoute", () => {
  it("shows a loading state while the session is being checked", () => {
    renderAt("/feed", { user: null, loading: true });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Feed page")).not.toBeInTheDocument();
  });

  it("redirects signed-out users to sign in", () => {
    renderAt("/feed", { user: null, loading: false });

    expect(screen.getByText("Sign in page")).toBeInTheDocument();
    expect(screen.queryByText("Feed page")).not.toBeInTheDocument();
  });

  it("shows the page to signed-in users", () => {
    renderAt("/feed", { user: { id: "user-1" }, loading: false });

    expect(screen.getByText("Feed page")).toBeInTheDocument();
  });
});
