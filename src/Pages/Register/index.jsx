import React, { useState } from "react";
import logo from "../../assets/logo.jpg";
import clientImg from "../../assets/client.png";
import doctorImg from "../../assets/doctor.png";
import nurseImg from "../../assets/nurse.png";
import pharmacyImg from "../../assets/pharmacy.png";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roleImages = {
    Client: clientImg,
    Doctor: doctorImg,
    Nurse: nurseImg,
    Pharmacy: pharmacyImg,
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role before signing up!");
      return;
    }

    if (selectedRole === "Client") navigate("/landing");
    else if (selectedRole === "Doctor") navigate("/doctor-register");
    else if (selectedRole === "Nurse") navigate("/nurse-register");
    else if (selectedRole === "Pharmacy") navigate("/pharmacy-register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[700px] shadow-lg rounded-lg overflow-hidden bg-white">

        <div className="hidden lg:block lg:w-1/2">
          <img className="h-full w-full object-cover" src={logo} alt="leftSideImage" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
          <form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col items-center justify-center">
            <h2 className="text-3xl lg:text-4xl text-gray-900 font-medium">Sign up</h2>
            <p className="text-sm text-gray-500/90 mt-3 text-center">
              Create a new account to get started
            </p>

            <button
              type="button"
              className="w-full mt-2 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="text-sm text-gray-500/90 whitespace-nowrap">
                or sign up with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="mt-6 w-full">
              <p className="text-sm text-gray-500/90 mb-3 text-center">
                Choose your role:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Client", "Doctor", "Nurse", "Pharmacy"].map((role) => (
                 <button
                     type="button"
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`flex flex-col items-center justify-center border rounded-lg px-3 py-2 transition-all ${selectedRole === role
                         ? "border-indigo-500 bg-indigo-50"
                         : "border-gray-300 hover:bg-gray-100"
                     }`}
                    >
                    <img
                            src={roleImages[role]}
                            alt={role}
                            className="w-4 h-4 mb-1"
                    />

                    <span className="text-sm text-gray-700">{role}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>

            <p className="text-gray-500/90 text-sm mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
