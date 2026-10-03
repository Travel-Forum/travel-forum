import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import { formatDate } from "../../utils/date";
import PostAuthor from "./PostAuthor";

const author = {
  id: "user-1",
  first_name: "Grigor",
  last_name: "Dimitrov",
  username: "grigor",
  avatar_url: null,
};

describe("PostAuthor", () => {
  it("shows the author's full name and username", () => {
    renderWithProviders(<PostAuthor author={author} />);

    expect(screen.getByText("Grigor Dimitrov")).toBeInTheDocument();
    expect(screen.getByText("@grigor")).toBeInTheDocument();
  });

  it("shows the formatted date when one is given", () => {
    const date = "2026-09-25T10:00:00Z";
    renderWithProviders(<PostAuthor author={author} date={date} />);

    expect(screen.getByText(formatDate(date))).toBeInTheDocument();
  });

  it("falls back to 'Unknown user' when the author is missing", () => {
    renderWithProviders(<PostAuthor author={null} />);

    expect(screen.getByText("Unknown user")).toBeInTheDocument();
    expect(screen.queryByText(/^@/)).not.toBeInTheDocument();
  });
});
