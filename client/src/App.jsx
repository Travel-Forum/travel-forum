import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import VerifyEmail from "./pages/VerifyEmail";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import RequireProfile from "./routes/RequireProfile";
import RequireNoProfile from "./routes/RequireNoProfile";
import AppLayout from "./layouts/AppLayout";
import Feed from "./pages/Feed";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import InfoPage from "./pages/InfoPage";
import { INFO_PAGES } from "./content/infoPages";
import RequireAdmin from "./routes/RequireAdmin";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {INFO_PAGES.map((page) => (
        <Route key={page.key} path={page.path} element={<InfoPage page={page} />} />
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
