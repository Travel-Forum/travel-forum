import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";
import { toaster } from "../components/ui/Toaster";
import SignInForm from "../components/auth/SignInForm";

const SignIn = () => {
  const navigate = useNavigate();

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

    navigate("/profile");
  };

  return (
    <SignInForm onSubmit={handleFormSubmit} />
  );
};

export default SignIn;
