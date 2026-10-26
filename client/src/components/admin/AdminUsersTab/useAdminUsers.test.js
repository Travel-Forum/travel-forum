import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAdminUsers } from "./useAdminUsers";
import {
  searchProfiles,
  setUserAdmin,
  setUserBlocked,
} from "../../../services/profileService";
import { showError, showSuccess } from "../../../utils/toast";

vi.mock("../../../services/profileService", () => ({
  searchProfiles: vi.fn(),
  setUserBlocked: vi.fn(),
  setUserAdmin: vi.fn(),
}));
vi.mock("../../../utils/toast", () => ({
  showError: vi.fn(),
  showSuccess: vi.fn(),
}));
vi.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: "admin-1" } }),
}));

const maria = { id: "user-2", is_blocked: false, is_admin: false };

const renderAdminUsers = async () => {
  searchProfiles.mockResolvedValue({ data: [maria] });
  const hook = renderHook(() => useAdminUsers());
  await waitFor(() => expect(hook.result.current.users).toEqual([maria]));
  return hook;
};

describe("useAdminUsers", () => {
  beforeEach(() => vi.clearAllMocks());

  it("searches again when the text changes", async () => {
    const { result } = await renderAdminUsers();

    act(() => result.current.setSearchText("maria"));

    await waitFor(() => expect(searchProfiles).toHaveBeenCalledWith("maria"));
  });

  it("knows who the current admin is", async () => {
    const { result } = await renderAdminUsers();

    expect(result.current.currentUserId).toBe("admin-1");
  });

  it("blocks a user and updates only that user in the list", async () => {
    setUserBlocked.mockResolvedValue({});
    const { result } = await renderAdminUsers();

    await act(() => result.current.toggleBlock(maria));

    expect(setUserBlocked).toHaveBeenCalledWith("user-2", true);
    expect(result.current.users[0].is_blocked).toBe(true);
    expect(showSuccess).toHaveBeenCalledWith("User was blocked");
  });

  it("gives admin rights", async () => {
    setUserAdmin.mockResolvedValue({});
    const { result } = await renderAdminUsers();

    await act(() => result.current.toggleAdmin(maria));

    expect(setUserAdmin).toHaveBeenCalledWith("user-2", true);
    expect(result.current.users[0].is_admin).toBe(true);
  });

  it("keeps the list as it was when the change fails", async () => {
    setUserBlocked.mockResolvedValue({ error: { message: "No permission" } });
    const { result } = await renderAdminUsers();

    await act(() => result.current.toggleBlock(maria));

    expect(result.current.users[0].is_blocked).toBe(false);
    expect(showError).toHaveBeenCalled();
  });
});
