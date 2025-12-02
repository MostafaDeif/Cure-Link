// src/App.jsx
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
import ArticlesPage from "./Pages/ArticlesPage.jsx";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import About from "./Pages/About/Index";
import Medicine from "./Pages/Medicine";
import Nursing from "./Pages/Nursing/index.jsx";
import User from "./Pages/User/Userprofile.jsx";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";
import ProductInfo from "./Pages/ProductInfo";
import Landing from "./Pages/Landing/index.jsx";

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

import NurseLayout from "./Pages/Nursing/NurseLayout.jsx";
import NurseDashboard from "./Pages/Nursing/NurseDashboard.jsx";
import NursePatients from "./Pages/Nursing/NursePatients.jsx";
import NurseProfile from "./Pages/Nursing/NurseProfile.jsx";
import NurseAppointments from "./Pages/Nursing/NurseAppointments.jsx";

import FindNurse from "./Pages/Nurse/FindNurse.jsx";
import nursesData from "./Pages/Nurse/nurseData";
import BookNurse from "./Pages/Nurse/BookNurse";
import AllNurses from "./Pages/Nurse/AllNurses.jsx";

import FindDoctors from "./Pages/Doctor/find_doctors";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import { doctorsData } from "./Pages/Doctor/doctorsData.js";
import AllDoctors from "./Pages/Doctor/AllDoctors";

import Footer from "./Components/Footer/Footer";



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
    "/services",
    "/find_doctor",
    "/find_nurse",
    "/articles",
  ];

  const showFooterOn = [
    "/",
    "/about",
    "/medicine",
    "/user",
    "/admin",
    "/cart",
    "/services",
    "/doctor",
    "/pharmacy",
  ];

  const showFooter = showFooterOn.includes(location.pathname);
  const showNavbar = showNavbarOn.includes(location.pathname);


  // const isPharmacyPath = location.pathname.startsWith("/pharmacy");

  return (
    <>
      {showNavbar &&  <Nav />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch {}
  }, [user]);

  useEffect(() => {
    const onAuthChange = () => {
      try {
        const s = localStorage.getItem("user");
        setUser(s ? JSON.parse(s) : null);
      } catch {
        setUser(null);
      }
    };

    const onStorageChange = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener("auth-change", onAuthChange);
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("auth-change", onAuthChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    <Router>
      
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/medicine" element={<Medicine />} />

            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />

            {/*  صفحة المنتج دايناميك */}
            <Route path="/product/:id" element={<ProductInfo />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/landing" element={<Landing />} />

            <Route
              path="/user"
              element={
               
                  <User />
               
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pharmacy-dashboard"
              element={
                <ProtectedRoute requiredRole="pharmacy">
                  <PharmacyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute requiredRole="doctor">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute requiredRole="doctor">
                  <Appoinment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-patients"
              element={
                <ProtectedRoute requiredRole="doctor">
                  <Patients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-profile"
              element={
                <ProtectedRoute requiredRole="doctor">
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/find_doctor" element={<FindDoctors />} />
            <Route path="/all-doctors" element={<AllDoctors />} />
            <Route
              path="/doctor-profile/:doctorName"
              element={<DoctorProfile doctorsData={doctorsData} />}
            />

            <Route
              path="/find_nurse"
              element={<FindNurse nursesData={nursesData} />}
            />
            <Route
              path="/nurse-book/:nurseName"
              element={<BookNurse nursesData={nursesData} />}
            />
            <Route
              path="/all-nurses"
              element={<AllNurses nursesData={nursesData} />}
            />

            <Route path="/nursing" element={<NurseLayout />}>
              <Route index element={<NurseDashboard />} />
              <Route path="nurse_dashboard/:id" element={<NurseDashboard />} />
              <Route
                path="nurse_appointments/:id"
                element={<NurseAppointments />}
              />
              <Route path="nurse_patients/:id" element={<NursePatients />} />
              <Route path="nurse_profile/:id" element={<NurseProfile />} />
            </Route>

            <Route path="/articles" element={<ArticlesPage />} />

            <Route
              path="/doctor-register"
              element={<DoctorRegister setUser={setUser} />}
            />
            <Route
              path="/nurse-register"
              element={<NurseRegister setUser={setUser} />}
            />
            <Route
              path="/pharmacy-register"
              element={<PharmacyRegister setUser={setUser} />}
            />
            <Route
              path="/client-register"
              element={<ClientRegister setUser={setUser} />}
            />
            <Route path="/under-review" element={<UnderReview />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      
    </Router>
  );
};
export default App;
