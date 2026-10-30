import { toaster } from "../components/ui/Toaster/Toaster";

/**
 * Shows a red toast with the error's message as its description.
 * @param {string} title
 * @param {{ message?: string }} [error]
 */
export const showError = (title, error) =>
  toaster.create({
    title,
    description: error?.message,
    type: "error",
  });

/**
 * Shows a green toast.
 * @param {string} title
 * @param {string} [description]
 */
export const showSuccess = (title, description) =>
  toaster.create({
    title,
    description,
    type: "success",
  });
