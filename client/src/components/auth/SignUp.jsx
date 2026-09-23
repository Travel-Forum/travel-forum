import { signUp } from "../../services/authService";

import { toaster } from "../ui/Toaster";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const handleFormSubmit = async (data) => {
    const result = await signUp(data);

    if (result.error) {
      toaster.create({
        title: "Sign up error",
        description: result.error.message,
        type: "error",
      });

      return;
    }

    toaster.create({
      title: "Check your email",
      description: "Open the confirmation link to complete registration.",
      type: "success",
    });
  };

  return (
    <>
      <SignUpForm onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignUp;
