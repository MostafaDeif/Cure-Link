import React from "react";
import logo from "../../assets/logo.jpg";
import clientImg from "../../assets/client.png";
import doctorImg from "../../assets/doctor.png";
import nurseImg from "../../assets/nurse.png";
import pharmacyImg from "../../assets/pharmacy.png";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const roleImages = {
    Client: clientImg,
    Doctor: doctorImg,
    Nurse: nurseImg,
    Pharmacy: pharmacyImg,
  };

  const handleRoleSelect = (role) => {
    if (role === "Client") navigate("/client-register");
    else if (role === "Doctor") navigate("/doctor-register");
    else if (role === "Nurse") navigate("/nurse-register");
    else if (role === "Pharmacy") navigate("/pharmacy-register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[600px] shadow-lg rounded-lg overflow-hidden bg-white">

        <div className="hidden lg:block lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src={logo}
            alt="leftSideImage"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl lg:text-4xl text-gray-900 font-semibold mb-2">
            Sign up
          </h2>

          <p className="text-sm text-gray-500/90 mb-6 text-center">
            Choose your role to continue registration
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
            {["Client", "Doctor", "Nurse", "Pharmacy"].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 hover:bg-indigo-50 transition-all"
              >
                <img
                  src={roleImages[role]}
                  alt={role}
                  className="w-12 h-12 mb-2"
                />
                <span className="text-base font-medium text-gray-700">
                  {role}
                </span>
              </button>
            ))}
          </div>

          {/* Login link */}
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
