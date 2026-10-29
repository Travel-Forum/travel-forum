import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test/renderWithProviders";
import ForgotPasswordForm from "./ForgotPasswordForm";

describe("ForgotPasswordForm", () => {
  it("submits the email", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<ForgotPasswordForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByLabelText("Email address"),
      "grigor@example.com",
    );
    await user.click(screen.getByRole("button", { name: "Send reset link" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "grigor@example.com" },
      expect.anything(),
    );
  });

  // The same text whether the account exists or not, so the page
  // can't be used to find out who is registered.
  it("shows the same message after sending", () => {
    renderWithProviders(<ForgotPasswordForm onSubmit={vi.fn()} sent />);

    expect(screen.getByText("Check your email")).toBeInTheDocument();
    expect(
      screen.getByText(/If an account exists for this email/),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Email address")).not.toBeInTheDocument();
  });
});
