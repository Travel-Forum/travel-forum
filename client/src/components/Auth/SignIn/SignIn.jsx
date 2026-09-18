import { SignInUser } from "../../../services/authService/SignInUser.js";
import { useProfileRedirect } from "../../../hooks/useProfileRedirect.js";

import { toaster } from "../../Ui/Toaster.jsx";
import SignInDesign from "./SignInDesign.jsx";

const SignIn = () => {
  const { redirectByProfile } = useProfileRedirect();

  const handleFormSubmit = async (data) => {
    const result = await SignInUser(data);

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
      <SignInDesign onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignIn;
