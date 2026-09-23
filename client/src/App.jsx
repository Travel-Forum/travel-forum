import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import CompleteProfile from "./pages/CompleteProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import RequireProfile from "./routes/RequireProfile";
import RequireNoProfile from "./routes/RequireNoProfile";
import AppLayout from "./layouts/AppLayout";
import Feed from "./pages/Feed";
import Locations from "./pages/Locations";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<GuestRoute />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RequireNoProfile />}>
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Route>

        <Route element={<RequireProfile />}>

          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
