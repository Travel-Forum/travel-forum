import { signIn } from "../services/authService";
import { useProfileRedirect } from "../hooks/useProfileRedirect";

import { toaster } from "../components/ui/Toaster";
import SignInForm from "../components/auth/SignInForm";

const SignIn = () => {
  const { redirectByProfile } = useProfileRedirect();

  const handleFormSubmit = async (data) => {
    const result = await signIn(data);

    if (result.error) {
      toaster.create({
        title: "Sign in error",
        description: result.error.message,
        type: "error",
      });

      return;
    }

    const { error } = await redirectByProfile(result.data.user.id);

    if (error) {
      toaster.create({
        title: "Sign in error",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <SignInForm onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignIn;
