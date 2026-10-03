import { describe, it, expect } from "vitest";
import { getLengthHint } from "./text.js";

describe("getLengthHint", () => {
  it("shows how many characters are missing below the minimum", () => {
    expect(getLengthHint("abc", 16, 64)).toBe("13 more characters needed (min 16)");
  });

  it("shows the character count once the minimum is reached", () => {
    expect(getLengthHint("a".repeat(20), 16, 64)).toBe("20/64");
  });

  it("switches to the counter at exactly the minimum length", () => {
    expect(getLengthHint("a".repeat(16), 16, 64)).toBe("16/64");
  });

  it("uses the singular when one character is missing", () => {
    expect(getLengthHint("a".repeat(15), 16, 64)).toBe("1 more character needed (min 16)");
  });

  it("ignores leading and trailing spaces", () => {
    expect(getLengthHint("     ", 16, 64)).toBe("16 more characters needed (min 16)");
  });
});
