import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth.js";
import { toaster } from "../../Ui/Toaster.jsx";

import CompleteProfileDesign from "./CompleteProfileDesign.jsx";

import { supabase } from "../../../config/supabaseClient.js";

const CompleteProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      phone: formData.phone,
      email: user.email,
    });

    if (error) {
      toaster.create({
        title: "Sign up error",
        description: error.message,
        type: "error",
      });

      return;
    }

    toaster.create({
      title: "Sign up successfully",
      description: `Welcome ${formData.username}!`,
      type: "success",
    });

    navigate("/profile");
  };

  return (
    <>
      <CompleteProfileDesign onSubmit={handleFormSubmit} />
    </>
  );
};
export default CompleteProfile;
