import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useResetPassword } from "./useResetPassword";
import {
  exchangeCodeForSession,
  updatePassword,
} from "../../services/authService";
import { showError, showSuccess } from "../../utils/toast";

const navigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
  useSearchParams: () => [new URLSearchParams("code=abc")],
}));
vi.mock("../../services/authService", () => ({
  exchangeCodeForSession: vi.fn(),
  updatePassword: vi.fn(),
}));
vi.mock("../../utils/toast", () => ({
  showError: vi.fn(),
  showSuccess: vi.fn(),
}));

const newPassword = { password: "Travel#2026", confirmPassword: "Travel#2026" };

describe("useResetPassword", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the form once the code is exchanged", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useResetPassword());

    expect(result.current.status).toBe("loading");
    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc");
  });

  it("shows an error when the link is used or expired", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: { message: "expired" } });

    const { result } = renderHook(() => useResetPassword());

    await waitFor(() => expect(result.current.status).toBe("error"));
  });

  it("shows an error when the request fails", async () => {
    exchangeCodeForSession.mockRejectedValue(new Error("offline"));

    const { result } = renderHook(() => useResetPassword());

    await waitFor(() => expect(result.current.status).toBe("error"));
  });

  it("saves the new password and goes to the feed", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: {} });
    updatePassword.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useResetPassword());
    await waitFor(() => expect(result.current.status).toBe("ready"));

    await act(() => result.current.handleSubmit(newPassword));

    expect(updatePassword).toHaveBeenCalledWith("Travel#2026");
    expect(showSuccess).toHaveBeenCalledWith("Password updated");
    expect(navigate).toHaveBeenCalledWith("/feed", { replace: true });
  });

  it("stays on the form when saving fails", async () => {
    const error = { message: "New password should be different" };
    exchangeCodeForSession.mockResolvedValue({ data: {} });
    updatePassword.mockResolvedValue({ error });

    const { result } = renderHook(() => useResetPassword());
    await waitFor(() => expect(result.current.status).toBe("ready"));

    await act(() => result.current.handleSubmit(newPassword));

    expect(showError).toHaveBeenCalledWith("Could not update password", error);
    expect(navigate).not.toHaveBeenCalled();
    expect(result.current.status).toBe("ready");
  });
});
