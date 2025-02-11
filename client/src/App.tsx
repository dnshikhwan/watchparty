import { Route, Routes } from "react-router";
import SignUp from "./pages/auth/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
