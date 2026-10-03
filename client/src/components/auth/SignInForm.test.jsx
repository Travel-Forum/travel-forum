import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import SignInForm from "./SignInForm";

// The Google button imports the auth service, which needs a real Supabase client.
vi.mock("../../services/authService", () => ({ signInWithGoogle: vi.fn() }));

describe("SignInForm", () => {
  it("shows required errors when submitted empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<SignInForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // "grigor@example" passes the browser's own type="email" check
  // (which would block the submit before our validation runs) but not ours.
  it("rejects an email without a domain extension", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignInForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText("Email address"), "grigor@example");
    await user.type(screen.getByLabelText("Password"), "Secret123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("submits the email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<SignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email address"), "grigor@example.com");
    await user.type(screen.getByLabelText("Password"), "Secret123!");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "grigor@example.com", password: "Secret123!" },
      expect.anything(),
    );
  });

  it("links to the sign up page", () => {
    renderWithProviders(<SignInForm onSubmit={vi.fn()} />);

    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute("href", "/signup");
  });
});
