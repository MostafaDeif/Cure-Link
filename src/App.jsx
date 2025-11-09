import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
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

const doctorsData = [
  {
    name: "Dr. Ahmed Youssef",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    specialty: "General",
    rating: "4.5",
    distance: "300m away",
  },
  {
    name: "Dr. Fatma Hassan",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Dentist",
    rating: "4.9",
    distance: "700m away",
  },
  {
    name: "Dr. Aya Nabil",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Neurologist",
    rating: "4.7",
    distance: "1.2km away",
  },
  {
    name: "Dr. Salma Hany",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Cardiologist",
    rating: "4.8",
    distance: "900m away",
  },
  {
    name: "Dr. Karim Adel",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    specialty: "ENT",
    rating: "4.4",
    distance: "1km away",
  },
  {
    name: "Dr. Hania Omar",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Surgeon",
    rating: "4.8",
    distance: "400m away",
  },
  {
    name: "Dr. Yara Magdy",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Dermatologist",
    rating: "4.5",
    distance: "600m away",
  },
  {
    name: "Dr. Ali Moustafa",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    specialty: "Orthopedic",
    rating: "4.7",
    distance: "500m away",
  },
  {
    name: "Dr. Laila Hassan",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
    specialty: "Psychiatrist",
    rating: "4.9",
    distance: "1.3km away",
  },
  {
    name: "Dr. Omar Saber",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
    specialty: "Eye Specialist",
    rating: "4.6",
    distance: "1.1km away",
  },
  {
    name: "Dr. Hossam Fathi",
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&w=400&q=80",
    specialty: "Lungs",
    rating: "4.5",
    distance: "950m away",
  },
  {
    name: "Dr. Sarah Nasser",
    imageUrl:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&w=400&q=80",
    specialty: "Therapist",
    rating: "4.8",
    distance: "1.6km away",
  },
];
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
          <Route path="/services" element={<Services />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/landing" element={<Landing />} />

          {/* protected routes */}
          <Route path="/user" element={<User />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              
                <Admin />
              
            }
          />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/nurse-register" element={<NurseRegister />} />
          <Route path="/pharmacy-register" element={<PharmacyRegister />} />
          <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
          <Route path="/doctor-dashboard" element={<Dashboard />} />
          <Route path="/doctor-appointments" element={<Appoinment />} />
          <Route path="/doctor-patients" element={<Patients />} />
          <Route path="/doctor-profile" element={<Profile />} />

          {/* FindDoctors page with doctorsData */}
          <Route
            path="/find_doctor"
            element={<FindDoctors doctorsData={doctorsData} />}
          />

          {/* DoctorProfile page with doctorsData */}
          <Route
            path="/doctor-profile/:doctorName"
            element={<DoctorProfile doctorsData={doctorsData} />}
          />

          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/under-review" element={<UnderReview />} />
          <Route path="*" element={<Error />} />

          <Route path="/nursing" element={<NurseLayout />}>
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
