import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AuthCallback from "./components/auth/AuthCallback";
import CompleteProfile from "./components/auth/CompleteProfile";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
