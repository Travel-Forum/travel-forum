import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { showError, showSuccess } from "../utils/toast";

import CompleteProfileForm from "../components/auth/CompleteProfileForm";
import { createProfile } from "../services/profileService";

const CompleteProfile = () => {
  const { user } = useAuth();
  const { refreshProfile } = useProfile();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    const { error } = await createProfile({
      id: user.id,
      email: user.email,
      ...formData,
    });

    if (error) {
      showError("Could not create profile", error);
      return;
    }

    showSuccess("Profile created", `Welcome ${formData.username}!`);

    await refreshProfile();
    navigate("/feed");
  };

  return (
    <>
      <CompleteProfileForm onSubmit={handleFormSubmit} />
    </>
  );
};
export default CompleteProfile;
