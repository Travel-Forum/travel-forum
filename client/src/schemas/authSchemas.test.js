import { describe, it, expect } from "vitest";
import {
  completeProfileSchema,
  forgotPasswordSchema,
  profileEditSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./authSchemas.js";

// The first message zod gives for a field, or undefined when it is valid.
const errorFor = (schema, values, field) =>
  schema
    .safeParse(values)
    .error?.issues.find((issue) => issue.path[0] === field)?.message;

const validProfile = {
  firstName: "George",
  lastName: "Petrov",
  username: "george_p",
  phone: "+359888123456",
};

describe("signUpSchema", () => {
  const valid = {
    email: "george@example.com",
    password: "Travel#2026",
    confirmPassword: "Travel#2026",
  };

  it("accepts a valid sign up", () => {
    expect(signUpSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(errorFor(signUpSchema, { ...valid, email: "george" }, "email")).toBe(
      "Please enter a valid email",
    );
  });

  it.each([
    ["Tr#1", "Password need to be minimum 8 symbols"],
    ["travel#2026", "Password must contain at least one uppercase letter"],
    ["TRAVEL#2026", "Password must contain at least one lowercase letter"],
    ["Travel#trip", "Password must contain at least one number"],
    ["Travel2026", "Password must contain at least one special character"],
  ])("rejects the password %s", (password, message) => {
    expect(
      errorFor(
        signUpSchema,
        { ...valid, password, confirmPassword: password },
        "password",
      ),
    ).toBe(message);
  });

  it("rejects passwords that don't match", () => {
    expect(
      errorFor(
        signUpSchema,
        { ...valid, confirmPassword: "Travel#2027" },
        "confirmPassword",
      ),
    ).toBe("Passwords do not match");
  });
});

describe("signInSchema", () => {
  it("only needs a password to be present", () => {
    expect(
      signInSchema.safeParse({ email: "george@example.com", password: "x" })
        .success,
    ).toBe(true);
  });

  it("requires the password", () => {
    expect(
      errorFor(
        signInSchema,
        { email: "george@example.com", password: "" },
        "password",
      ),
    ).toBe("Password is required");
  });
});

describe("completeProfileSchema", () => {
  it("accepts a valid profile", () => {
    expect(completeProfileSchema.safeParse(validProfile).success).toBe(true);
  });

  it.each(["firstName", "lastName", "username"])(
    "accepts exactly 4 and 32 characters in %s",
    (field) => {
      for (const value of ["abcd", "a".repeat(32)]) {
        expect(
          errorFor(
            completeProfileSchema,
            { ...validProfile, [field]: value },
            field,
          ),
        ).toBeUndefined();
      }
    },
  );

  it.each(["firstName", "lastName", "username"])(
    "rejects 3 and 33 characters in %s",
    (field) => {
      expect(
        errorFor(
          completeProfileSchema,
          { ...validProfile, [field]: "abc" },
          field,
        ),
      ).toBe("At least 4 symbols");
      expect(
        errorFor(
          completeProfileSchema,
          { ...validProfile, [field]: "a".repeat(33) },
          field,
        ),
      ).toBe("Maximum of 32 characters");
    },
  );

  it("names the empty field in its message", () => {
    expect(
      errorFor(
        completeProfileSchema,
        { ...validProfile, username: "" },
        "username",
      ),
    ).toBe("Username is required");
  });

  it("rejects an invalid phone number", () => {
    expect(
      errorFor(
        completeProfileSchema,
        { ...validProfile, phone: "+3591" },
        "phone",
      ),
    ).toBe("Please enter a valid phone number");
  });
});

describe("profileEditSchema", () => {
  it("does not ask for a username, which can't be changed", () => {
    const { firstName, lastName, phone } = validProfile;

    expect(
      profileEditSchema.safeParse({ firstName, lastName, phone }).success,
    ).toBe(true);
  });
});

describe("forgotPasswordSchema", () => {
  it("needs only a valid email", () => {
    expect(
      forgotPasswordSchema.safeParse({ email: "george@example.com" }).success,
    ).toBe(true);
    expect(errorFor(forgotPasswordSchema, { email: "" }, "email")).toBe(
      "Email is required",
    );
  });
});

describe("resetPasswordSchema", () => {
  const valid = { password: "Travel#2026", confirmPassword: "Travel#2026" };

  it("accepts a strong password typed twice", () => {
    expect(resetPasswordSchema.safeParse(valid).success).toBe(true);
  });

  it("uses the same password rules as sign up", () => {
    expect(
      errorFor(
        resetPasswordSchema,
        { password: "travel#2026", confirmPassword: "travel#2026" },
        "password",
      ),
    ).toBe("Password must contain at least one uppercase letter");
  });

  it("rejects passwords that do not match", () => {
    expect(
      errorFor(
        resetPasswordSchema,
        { ...valid, confirmPassword: "Travel#2027" },
        "confirmPassword",
      ),
    ).toBe("Passwords do not match");
  });
});
