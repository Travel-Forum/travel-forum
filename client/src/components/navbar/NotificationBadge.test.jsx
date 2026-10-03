import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import NotificationBadge from "./NotificationBadge";

describe("NotificationBadge", () => {
  it("renders nothing when there are no unread notifications", () => {
    renderWithProviders(<NotificationBadge count={0} />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("shows the unread count", () => {
    renderWithProviders(<NotificationBadge count={3} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows 9 as the maximum", () => {
    renderWithProviders(<NotificationBadge count={9} />);

    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("shows 9+ above nine", () => {
    renderWithProviders(<NotificationBadge count={12} />);

    expect(screen.getByText("9+")).toBeInTheDocument();
  });
});
