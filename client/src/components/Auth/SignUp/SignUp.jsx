import { SignUpUser } from "../../../services/authService/SignUpUser.js";

import { toaster } from "../../Ui/Toaster.jsx";
import SignUpDesign from "./SignUpDesign.jsx";

const SignUp = () => {
  const handleFormSubmit = async (data) => {
    const result = await SignUpUser(data);

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
      <SignUpDesign onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignUp;
