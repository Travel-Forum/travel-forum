import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

import { showError } from "../utils/toast";
import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    const result = await signUp(data);

    if (result.error) {
      showError("Sign up error", result.error);
      return;
    }

    navigate("/verify-email", { replace: true, state: { email: data.email } });
  };

  return <SignUpForm onSubmit={handleFormSubmit} />;
};

export default SignUp;
