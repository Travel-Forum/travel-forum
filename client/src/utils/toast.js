import { toaster } from "../components/ui/Toaster";

export const showError = (title, error) =>
  toaster.create({
    title,
    description: error?.message,
    type: "error",
  });

export const showSuccess = (title, description) =>
  toaster.create({
    title,
    description,
    type: "success",
  });
