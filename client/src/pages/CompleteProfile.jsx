import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { toaster } from "../components/ui/Toaster";

import CompleteProfileForm from "../components/auth/CompleteProfileForm";
import { createProfile } from "../services/profileService";

const CompleteProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const { error } = await createProfile({
      id: user.id,
      email: user.email,
      ...formData,
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

    navigate("/feed");
  };

  return (
    <>
      <CompleteProfileForm onSubmit={handleFormSubmit} />
    </>
  );
};
export default CompleteProfile;
