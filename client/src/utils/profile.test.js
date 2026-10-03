import { describe, it, expect } from "vitest";
import { getFullName } from "./profile.js";

describe("getFullName", () => {
  it("joins first and last name with a space", () => {
    expect(getFullName({ first_name: "Grigor", last_name: "Dimitrov" })).toBe("Grigor Dimitrov");
  });

  it("returns only the first name when the last name is missing", () => {
    expect(getFullName({ first_name: "Grigor" })).toBe("Grigor");
  });

  it("returns an empty string when there is no profile", () => {
    expect(getFullName(null)).toBe("");
  });
});
