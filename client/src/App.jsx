import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import AuthCallback from "./pages/AuthCallback/AuthCallback";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute/GuestRoute";
import RequireProfile from "./routes/RequireProfile/RequireProfile";
import RequireNoProfile from "./routes/RequireNoProfile/RequireNoProfile";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Feed from "./pages/Feed/Feed";
import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";
import InfoPage from "./pages/InfoPage/InfoPage";
import { INFO_PAGES } from "./content/infoPages";
import RequireAdmin from "./routes/RequireAdmin/RequireAdmin";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import UserProfile from "./pages/UserProfile/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {INFO_PAGES.map((page) => (
        <Route
          key={page.key}
          path={page.path}
          element={<InfoPage page={page} />}
        />
      ))}

      <Route element={<GuestRoute />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RequireNoProfile />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Route>

        <Route element={<RequireProfile />}>
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:username" element={<UserProfile />} />

            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
