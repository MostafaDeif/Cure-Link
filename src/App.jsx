import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
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
import NurseRegister from "./Pages/Register/NurseRegister";
import PharmacyRegister from "./Pages/Register/PharmacyRegister";
import ClientRegister from "./Pages/Register/ClientRegister";
import UnderReview from "./Pages/UnderReview";
import Services from "./Pages/Services";
import Pharmacy from "./Pages/Pharmacy";
import Doctor from "./Pages/Doctor";
import PharmacyDashboard from "./Pages/PharmacyDashbord";
import Dashboard from "./Pages/DoctorProfile/Dashboard";
import Appoinment from "./Pages/DoctorProfile/Appoinment";
import Patients from "./Pages/DoctorProfile/Patients";
import Profile from "./Pages/DoctorProfile/Profile";
import NurseLayout from "./Pages/Nurcing/NurseLayout";
import NurseDashboard from "./Pages/Nurcing/NurseDashboard";
import NursePatients from "./Pages/Nurcing/NursePatients";
import NurseProfile from "./Pages/Nurcing/NurseProfile";
import FindNurse from "./Pages/Nurse/find_nurse";
import nursesData from "./Pages/Nurse/nurseData";
import BookNurse from "./Pages/Nurse/BookNurse";
import AllNurses from "./Pages/Nurse/allNurses";
import NurseAppointments from "./Pages/Nurcing/NurseAppointments";
import FindDoctors from "./Pages/Doctor/find_doctors";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import { doctorsData } from './Pages/Doctor/doctorsData.js';
import AllDoctors from "./Pages/Doctor/AllDoctors";


import Footer from "./Components/Footer/Footer";
import Articles from "./Pages/Articles/index.jsx";
const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbarOn = [
    "/",
    "/about",
    "/medicine",
    "/pharmacy",
    "/user",
    "/admin",
    "/cart",
    "/product",
    "/services",
    "/find_doctor",
    "/pharmacy",
    "/find_nurse",

  ];
  const showFooterOn = [
    "/",
    "/about",
    "/medicine",
    "/user",
    "/about",
    "/admin",
    "/cart",
    "/product",
    "/services",
    "/doctor",
    "/pharmacy",
  ];

  const showFooter = showFooterOn.includes(location.pathname);
  const showNavbar = showNavbarOn.includes(location.pathname);
  return (
    <>
      {showNavbar && <Nav />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};
const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  });

  // keep localStorage in sync with user state
  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
  }, [user]);
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/nursing" element={<Nursing />} />
          <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/landing" element={<Landing />} />

          {/* protected routes */}
          <Route path="/user" element={<ProtectedRoute user={user}><User /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<ProtectedRoute user={user} requiredRole="admin"><Admin /></ProtectedRoute>} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/nurse-register" element={<NurseRegister />} />
          <Route path="/pharmacy-register" element={<PharmacyRegister />} />
          <Route path="/pharmacy-dashboard" element={<ProtectedRoute user={user} requiredRole="pharmacy"><PharmacyDashboard /></ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute user={user} requiredRole="doctor"><Dashboard /></ProtectedRoute>} />
          <Route path="/doctor-appointments" element={<ProtectedRoute user={user} requiredRole="doctor"><Appoinment /></ProtectedRoute>} />
          <Route path="/doctor-patients" element={<ProtectedRoute user={user} requiredRole="doctor"><Patients /></ProtectedRoute>} />
          <Route path="/doctor-profile" element={<Profile />} />
             <Route path="/all-doctors" element={<AllDoctors />} />

          {/* FindDoctors page with doctorsData */}
          <Route
            path="/find_doctor" element={<FindDoctors />} />

          {/* DoctorProfile page with doctorsData */}

          <Route
            path="/doctor-profile/:doctorName"
            element={<DoctorProfile doctorsData={doctorsData} />}
          />
          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/under-review" element={<UnderReview />} />
          <Route path="*" element={<Error />} />

          <Route path="/nursing" element={<ProtectedRoute user={user} requiredRole="nurse"><NurseLayout /></ProtectedRoute>}>
            <Route index element={<NurseDashboard />} />
            <Route path="nurse_dashboard" element={<NurseDashboard />} />
            <Route path="nurse_appointments" element={<NurseAppointments />} />
            <Route path="nurse_patients" element={<NursePatients />} />
            <Route path="nurse_profile" element={<NurseProfile />} />
          </Route>
          <Route
            path="/find_nurse"
            element={<FindNurse nursesData={nursesData} />}
          />
          <Route
            path="/nurse-book/:nurseName"
            element={<BookNurse nursesData={nursesData} />}
          />
          <Route path="/all-nurses" element={<AllNurses nursesData={nursesData} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
