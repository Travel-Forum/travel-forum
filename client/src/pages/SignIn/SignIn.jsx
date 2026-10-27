import { useNavigate, useLocation } from "react-router-dom";
import { signIn } from "../../services/authService";
import { showError } from "../../utils/toast";
import SignInForm from "../../components/auth/SignInForm/SignInForm";
import { getRedirectPath } from "../../utils/getRedirectPath";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = async (data) => {
    const result = await signIn(data);

    if (result.error) {
      showError("Sign in error", result.error);
      return;
    }

    navigate(getRedirectPath(location), { replace: true });
  };

  return <SignInForm onSubmit={handleFormSubmit} />;
};

export default SignIn;
