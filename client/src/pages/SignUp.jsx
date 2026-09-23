import { signUp } from "../services/authService";

import { showError, showSuccess } from "../utils/toast";
import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
  const handleFormSubmit = async (data) => {
    const result = await signUp(data);

    if (result.error) {
      showError("Sign up error", result.error);
      return;
    }

    showSuccess(
      "Check your email",
      "Open the confirmation link to complete registration.",
    );
  };

  return (
    <>
      <SignUpForm onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignUp;
