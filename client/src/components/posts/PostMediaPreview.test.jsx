import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import PostMediaPreview from "./PostMediaPreview";

const image = new File(["image"], "sea.jpg", { type: "image/jpeg" });
const video = new File(["video"], "trip.mp4", { type: "video/mp4" });

// jsdom has no object URLs, so we fake them and record the calls.
beforeEach(() => {
  URL.createObjectURL = vi.fn((file) => `blob:${file.name}`);
  URL.revokeObjectURL = vi.fn();
});

describe("PostMediaPreview", () => {
  it("renders nothing when no files are selected", () => {
    renderWithProviders(<PostMediaPreview mediaFiles={[]} onRemove={vi.fn()} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows an image preview for an image file", () => {
    renderWithProviders(<PostMediaPreview mediaFiles={[image]} onRemove={vi.fn()} />);

    expect(screen.getByRole("img", { name: "sea.jpg" })).toHaveAttribute("src", "blob:sea.jpg");
  });

  it("shows a video preview for a video file", () => {
    const { container } = renderWithProviders(
      <PostMediaPreview mediaFiles={[video]} onRemove={vi.fn()} />,
    );

    expect(container.querySelector("video")).toHaveAttribute("src", "blob:trip.mp4");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("calls onRemove with the clicked file", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    renderWithProviders(<PostMediaPreview mediaFiles={[image, video]} onRemove={onRemove} />);

    await user.click(screen.getByRole("button", { name: "Remove trip.mp4" }));

    expect(onRemove).toHaveBeenCalledWith(video);
  });

  it("releases the preview URLs when it is removed from the page", () => {
    const { unmount } = renderWithProviders(
      <PostMediaPreview mediaFiles={[image]} onRemove={vi.fn()} />,
    );

    unmount();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:sea.jpg");
  });
});
