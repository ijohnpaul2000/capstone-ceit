import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import SharedLayout from "./layout/SharedLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import GuestLogin from "./pages/GuestLogin";
import Landing from "./pages/Landing";
import UserLogin from "./pages/UserLogin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path={`/auth/user`} element={<UserLogin />} />
            <Route path={`/auth/guest`} element={<GuestLogin />} />
            <Route path={`/auth/forgotpassword`} element={<ForgotPassword />} />
          </Route>
          <Route path={`/manuscript/dashboard`} element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
