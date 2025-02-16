import { Route, Routes } from "react-router";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/auth/ResetPassword";
import Landing from "./pages/landing/Landing";
import Rooms from "./pages/rooms/Rooms";
import CreateRoom from "./pages/rooms/CreateRoom";
import Friends from "./pages/friends/Friends";
import Chat from "./pages/chat/Chat";

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
        <Route path="/" element={<Landing />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/create" element={<CreateRoom />} />

        <Route path="/friends" element={<Friends />} />
        <Route path="/chat/:username" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
