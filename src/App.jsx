import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Pages & Components
import ScrollToTop from "./Components/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute";
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
import Cart from "./Pages/Cart";
import ProductInfo from "./Pages/ProductInfo";
import SignUp from "./Pages/Register";
import Landing from "./Components/Landing";
import DoctorRegister from "./Pages/Register/DoctorRegister";
import UnderReview from "./Pages/UnderReview";


const Layout = ({ children }) => {
  const location = useLocation();

  // Navbar يظهر فقط في الصفحات اللي موجودة هنا
  const showNavbarOn = ["/", "/about", "/medicine", "/pharmacy", "/nursing", "/user", "/admin", "/cart", "/product"];
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
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/nursing" element={<Nursing />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          {/* protected routes */}
          <Route path="/user"  element={<User />} />
          {/* <Route path="/user"  element={<ProtectedRoute user={auth}><User /></ProtectedRoute>} /> */}
          <Route path="/admin" element={<ProtectedRoute user={auth}><Admin /></ProtectedRoute>} />
          <Route path="*" element={<Error />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/under-review" element={<UnderReview />} />


        </Routes>
      </Layout>
    </Router>
  );
};

export default App;