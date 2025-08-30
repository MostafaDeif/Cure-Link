import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Nav from "./components/Nav";

const Layout = ({ children }) => {
  const location = useLocation();

  // Navbar يظهر فقط في الصفحات اللي موجودة هنا
  const showNavbarOn = ["/"];
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
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
