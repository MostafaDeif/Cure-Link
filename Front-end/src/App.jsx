import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Pages & Components
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import About from "./Pages/About/Index";
import Medicine from "./Pages/Medicine";
import Nursing from "./Pages/Nurcing";
import User from "./Pages/User";
import Admin from "./Pages/Admin";
import ProtectedRoute from "./Pages/ProtectedRoute";

const Layout = ({ children }) => {
  const location = useLocation();

  // Navbar يظهر فقط في الصفحات اللي موجودة هنا
  const showNavbarOn = ["/", "/about", "/medicine", "/pharmacy", "/nursing", "/user", "/admin"];
  const showNavbar = showNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Nav />}
      {children}
    </>
  );
};

const App = () => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/nursing" element={<Nursing />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute user={auth}><Admin /></ProtectedRoute>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
