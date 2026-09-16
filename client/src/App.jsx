import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
