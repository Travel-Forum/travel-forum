import { describe, it, expect, vi, afterEach } from "vitest";
import { failWith, toFriendlyError } from "./errors.js";

describe("failWith", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns the error with a message that is safe to show", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = failWith("Load posts error", {
      code: "42501",
      message: "new row violates row-level security policy",
    });

    expect(result.error.message).toBe("You don't have permission to do this.");
  });

  it("logs the raw message for debugging", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});

    failWith("Load posts error", { code: "XX000", message: "internal error" });

    expect(log).toHaveBeenCalledWith("Load posts error:", "internal error");
  });
});

describe("toFriendlyError", () => {
  it("explains a row level security error", () => {
    const error = toFriendlyError({
      code: "42501",
      message: "new row violates row-level security policy",
    });

    expect(error.message).toBe("You don't have permission to do this.");
  });

  it("explains a check constraint error", () => {
    const error = toFriendlyError({
      code: "23514",
      message: "violates check constraint",
    });

    expect(error.message).toBe(
      "Some of the data is invalid. Please check your input.",
    );
  });

  it("explains an expired session", () => {
    const error = toFriendlyError({ code: "PGRST301", message: "JWT expired" });

    expect(error.message).toBe(
      "Your session has expired. Please sign in again.",
    );
  });

  it("falls back to a generic message for unknown errors", () => {
    const error = toFriendlyError({ code: "XX000", message: "internal error" });

    expect(error.message).toBe("Something went wrong. Please try again.");
  });

  it("keeps the original error code", () => {
    expect(toFriendlyError({ code: "42501", message: "..." }).code).toBe(
      "42501",
    );
  });

  it("handles a missing error object", () => {
    expect(toFriendlyError(null).message).toBe(
      "Something went wrong. Please try again.",
    );
  });
});
