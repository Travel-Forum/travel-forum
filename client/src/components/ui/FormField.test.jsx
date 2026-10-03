import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Input } from "@chakra-ui/react";
import { renderWithProviders } from "../../test/renderWithProviders";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("connects the label to the input", () => {
    renderWithProviders(
      <FormField label="Title">
        <Input />
      </FormField>,
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("shows the helper text", () => {
    renderWithProviders(
      <FormField label="Title" helperText="3/64">
        <Input />
      </FormField>,
    );

    expect(screen.getByText("3/64")).toBeInTheDocument();
  });

  it("shows the error message and marks the input as invalid", () => {
    renderWithProviders(
      <FormField label="Title" error={{ message: "Give your post a title" }}>
        <Input />
      </FormField>,
    );

    expect(screen.getByText("Give your post a title")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not show an error when there is none", () => {
    renderWithProviders(
      <FormField label="Title">
        <Input />
      </FormField>,
    );

    expect(screen.getByLabelText("Title")).not.toHaveAttribute("aria-invalid", "true");
  });
});
