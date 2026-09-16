import { useNavigate } from "react-router-dom";

import { SignInUser } from '../../../services/authService/SignInUser.js';

import { toaster } from '../../ui/toaster.jsx';
import SignInDesign from "./SignInDesign.jsx";

const SignIn = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {

    const result = await SignInUser(data);

    if (result.error) {
      toaster.create({
        title: 'Sign in error',
        description: result.error.message,
        type: "error",
      })

      return;
    }

    navigate('/profile');
  };

  return (
    <>
      <SignInDesign onSubmit={handleFormSubmit} />
    </>
  );
};

export default SignIn;
