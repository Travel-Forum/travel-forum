import { useState } from "react";
import { sendPasswordReset } from "../../services/authService";
import { showError } from "../../utils/toast";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const handleFormSubmit = async (data) => {
    const result = await sendPasswordReset(data);

    if (result.error) {
      showError("Could not send reset link", result.error);
      return;
    }

    setSent(true);
  };

  return <ForgotPasswordForm sent={sent} onSubmit={handleFormSubmit} />;
};

export default ForgotPassword;
