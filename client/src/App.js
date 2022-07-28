import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddThesis from "./components/AddThesis";
import Footer from "./components/Footer";
import SharedLayout from "./layout/SharedLayout";
import Dashboard from "./pages/Dashboard";
import GuestLogin from "./pages/GuestLogin";
import Landing from "./pages/Landing";
import UserLogin from "./pages/UserLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path={`/auth/user`} element={<UserLogin />} />
          <Route path={`/auth/guest`} element={<GuestLogin />} />
        </Route>
        <Route path={`/manuscript/dashboard`} element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
