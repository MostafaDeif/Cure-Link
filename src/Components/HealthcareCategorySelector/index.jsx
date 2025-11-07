import React from 'react';
import { Link } from 'react-router-dom';

// --- SVG ICONS ---
const icons = {
    doctor: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 2a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 16h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v2" />
            <path d="M12 12l-2 2" />
            <path d="M9 15l-1 1" />
        </svg>
    ),
    pharmacy: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 15-6 6" />
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L11 18l-5 4 4-5 11.5-11.5Z" />
        </svg>
    ),
    nursing: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.2 11H8l2.71 6.09 3.1-6.18 2.56 5.12 2.74-5.48H21" />
        </svg>
    ),
};

// --- Categories View Component ---
export const HealthcareCategorySelector = () => (
    <div className="bg-gray-50 p-6 sm:p-10 font-sans flex flex-col items-center">
        <header className="w-full max-w-7xl mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Select Your Healthcare Service</h1>
            <p className="text-gray-500 mt-2 text-lg">Choose a category to explore specialized services.</p>
        </header>

        <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link
                    to="/find_doctor"
                    className="flex flex-col items-center justify-center text-center p-5 rounded-2xl shadow-xl text-white transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl bg-blue-600"
                    aria-label="Doctor"
                >
                    {icons.doctor({ className: "w-7 h-7 mb-2" })}
                    <span className="text-lg font-bold select-none tracking-wide">Doctor</span>
                </Link>

                <Link
                    to="/pharmacy"
                    className="flex flex-col items-center justify-center text-center p-5 rounded-2xl shadow-xl text-white transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl bg-indigo-500"
                    aria-label="Pharmacy"
                >
                    {icons.pharmacy({ className: "w-7 h-7 mb-2" })}
                    <span className="text-lg font-bold select-none tracking-wide">Pharmacy</span>
                </Link>

                <Link
                    to="/nursing"
                    className="flex flex-col items-center justify-center text-center p-5 rounded-2xl shadow-xl text-white transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-green-500 to-teal-600"
                    aria-label="Nursing"
                >
                    {icons.nursing({ className: "w-7 h-7 mb-2" })}
                    <span className="text-lg font-bold select-none tracking-wide">Nursing</span>
                </Link>
            </div>
        </div>
    </div>
);

export default HealthcareCategorySelector;
