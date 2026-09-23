import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";
import { showError } from "../utils/toast";
import SignInForm from "../components/auth/SignInForm";

const SignIn = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const result = await signIn(data);

    if (result.error) {
      showError("Sign in error", result.error);
      return;
    }

    navigate("/feed");
  };

  return (
    <SignInForm onSubmit={handleFormSubmit} />
  );
};

export default SignIn;
