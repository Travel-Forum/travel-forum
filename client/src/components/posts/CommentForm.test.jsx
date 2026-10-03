import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import CommentForm from "./CommentForm";

describe("CommentForm", () => {
  it("shows an error and does not submit an empty comment", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<CommentForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("Write a comment..."), "   ");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(await screen.findByText("Write something before posting")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the trimmed comment text", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);
    renderWithProviders(<CommentForm onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("Write a comment..."), "  Great trip!  ");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(onSubmit).toHaveBeenCalledWith("Great trip!");
  });

  it("clears the field after a successful submit", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentForm onSubmit={vi.fn().mockResolvedValue(true)} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");

    await user.type(textarea, "Great trip!");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(textarea).toHaveValue("");
  });

  it("keeps the text when saving fails", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentForm onSubmit={vi.fn().mockResolvedValue(false)} />);
    const textarea = screen.getByPlaceholderText("Write a comment...");

    await user.type(textarea, "Great trip!");
    await user.click(screen.getByRole("button", { name: "Comment" }));

    expect(textarea).toHaveValue("Great trip!");
  });

  it("prefills the text when editing", () => {
    renderWithProviders(
      <CommentForm onSubmit={vi.fn()} initialContent="Old text" submitLabel="Save" />,
    );

    expect(screen.getByPlaceholderText("Write a comment...")).toHaveValue("Old text");
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("shows a cancel button only when onCancel is given", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    renderWithProviders(<CommentForm onSubmit={vi.fn()} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("has no cancel button by default", () => {
    renderWithProviders(<CommentForm onSubmit={vi.fn()} />);

    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
  });
});
