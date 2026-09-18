import { useNavigate } from "react-router-dom";

import { SignInUser } from "../../../services/authService/SignInUser.js";

import { toaster } from "../../Ui/Toaster.jsx";
import SignInDesign from "./SignInDesign.jsx";

import { checkUserExist } from "../../../utils/checkUserExist.js";

const SignIn = () => {
  const navigate = useNavigate();

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

    const { data: profile, error: profileError } = await checkUserExist(
      result.data.user.id,
    );

    if (profileError) {
      toaster.create({
        title: "Sign in error",
        description: profileError.message,
        type: "error",
      });

      return;
    }

    if (profile) {
      navigate("/profile");
      return;
    }

    navigate("/complete-profile");
  };

  return (
    <>
      <SignInDesign onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignIn;
