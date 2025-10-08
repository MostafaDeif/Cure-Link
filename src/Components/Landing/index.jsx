export default function Landing() {
  return (
    <div className="w-full flex justify-center bg-gray-100 pt-10 pb-20">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="py-16 md:pl-20 mx-2 flex flex-col items-start text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl p-10 text-white">
          <div>
            <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
              Get your medicenes
            </h1>
            <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg mt-2">
              Find all your medicenes from the nearest pharmacy.
            </p>
          </div>
          <button className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-6 transition transform hover:bg-slate-200 hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>

        <div className="py-16 md:pl-20 mx-2 flex flex-col items-start text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl p-10 text-white">
          <div>
            <h1 className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
              Get your nurse care
            </h1>
            <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg mt-2">
              Connect with the best nurses in your area.
            </p>
          </div>
          <button className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-6 transition transform hover:bg-slate-200 hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
