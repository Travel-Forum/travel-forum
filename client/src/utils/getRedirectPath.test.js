import { describe, it, expect } from "vitest";
import { getRedirectPath } from "./getRedirectPath.js";

describe("getRedirectPath", () => {
  it("goes back to the page that needed a sign in, with its query", () => {
    const location = {
      state: { from: { pathname: "/feed", search: "?post=23053ee8" } },
    };

    expect(getRedirectPath(location)).toBe("/feed?post=23053ee8");
  });

  it("goes to the feed when sign in was opened directly", () => {
    expect(getRedirectPath({ state: null })).toBe("/feed");
  });
});
