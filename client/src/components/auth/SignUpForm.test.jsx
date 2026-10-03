import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import SignUpForm from "./SignUpForm";

// The Google button imports the auth service, which needs a real Supabase client.
vi.mock("../../services/authService", () => ({ signInWithGoogle: vi.fn() }));

const fillForm = async (user, { email, password, confirmPassword }) => {
  await user.type(screen.getByLabelText("Email address"), email);
  await user.type(screen.getByLabelText("Password"), password);
  await user.type(screen.getByLabelText("Confirm Password"), confirmPassword);
  await user.click(screen.getByRole("button", { name: "Sign Up" }));
};

describe("SignUpForm", () => {
  it("shows required errors when submitted empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<SignUpForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(screen.getByText("Please confirm your password")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects a password shorter than 8 characters", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpForm onSubmit={vi.fn()} />);

    await fillForm(user, {
      email: "grigor@example.com",
      password: "Ab1!",
      confirmPassword: "Ab1!",
    });

    expect(await screen.findByText("Password need to be minimum 8 symbols")).toBeInTheDocument();
  });

  it("rejects a password without a special character", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpForm onSubmit={vi.fn()} />);

    await fillForm(user, {
      email: "grigor@example.com",
      password: "Secret123",
      confirmPassword: "Secret123",
    });

    expect(
      await screen.findByText("Password must contain at least one special character"),
    ).toBeInTheDocument();
  });

  it("rejects passwords that do not match", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<SignUpForm onSubmit={onSubmit} />);

    await fillForm(user, {
      email: "grigor@example.com",
      password: "Secret123!",
      confirmPassword: "Secret123?",
    });

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a valid form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(<SignUpForm onSubmit={onSubmit} />);

    await fillForm(user, {
      email: "grigor@example.com",
      password: "Secret123!",
      confirmPassword: "Secret123!",
    });

    expect(onSubmit).toHaveBeenCalledWith(
      {
        email: "grigor@example.com",
        password: "Secret123!",
        confirmPassword: "Secret123!",
      },
      expect.anything(),
    );
  });
});
