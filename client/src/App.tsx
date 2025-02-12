import { Route, Routes } from "react-router";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* public routes */}
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route
          path="/auth/request-reset-password"
          element={<RequestResetPassword />}
        />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
