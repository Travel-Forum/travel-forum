import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import { ConfirmDialog } from "./ConfirmDialog";

const renderDialog = (props = {}) => {
  const handlers = { onConfirm: vi.fn(), onCancel: vi.fn() };

  renderWithProviders(
    <ConfirmDialog
      open
      title="Discard this post?"
      description="Your draft will be lost."
      confirmLabel="Discard"
      cancelLabel="Keep editing"
      {...handlers}
      {...props}
    />,
  );

  return handlers;
};

describe("ConfirmDialog", () => {
  it("shows the title and description when open", () => {
    renderDialog();

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Discard this post?")).toBeInTheDocument();
    expect(screen.getByText("Your draft will be lost.")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    renderDialog({ open: false });

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm when the confirm button is clicked", async () => {
    const user = userEvent.setup();
    const { onConfirm, onCancel } = renderDialog();

    await user.click(screen.getByRole("button", { name: "Discard" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("calls onCancel when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    const { onConfirm, onCancel } = renderDialog();

    await user.click(screen.getByRole("button", { name: "Keep editing" }));

    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("uses default button labels", () => {
    renderDialog({ confirmLabel: undefined, cancelLabel: undefined });

    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
