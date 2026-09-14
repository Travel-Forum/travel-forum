import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { SignInUser } from '../../../services/authService/SignInUser.js';

import SignInDesign from "./SignInDesign";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await SignInUser(formData);

    navigate('/profile');
  };


  return (
    <>
      <SignInDesign formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
};

export default SignIn;
