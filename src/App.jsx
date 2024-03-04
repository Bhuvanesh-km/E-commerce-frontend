import AuthProvider from "./context/AuthContext";
import PaginationProvider from "./context/PaginationContext";
import { NavBar, RequireAuth } from "./components/index";
import {
  Home,
  Orders,
  CheckOut,
  Cart,
  UserProfile,
  Login,
  SignUp,
  PageNotFound,
} from "./pages/index";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <>
      <AuthProvider>
        <PaginationProvider>
          {showNavbar && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RequireAuth />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/user-profile" element={<UserProfile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </PaginationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
