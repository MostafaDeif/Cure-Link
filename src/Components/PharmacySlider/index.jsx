import React, { useState } from "react";

const PharmacySlider = () => {
  const [stopScroll, setStopScroll] = useState(false);

  const pharmacies = [
    {
      name: "صيدليات مصر",
      branch: "فرع مدينة نصر",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQQ4lrnGeITJzYxM3OiN-mgzd9J-GFLSHnA&s",
    },
    {
      name: "صيدليات العزبي",
      branch: "فرع المعادي",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQQ4lrnGeITJzYxM3OiN-mgzd9J-GFLSHnA&s",
    },
    {
      name: "صيدليات رشدي",
      branch: "فرع الإسكندرية",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQQ4lrnGeITJzYxM3OiN-mgzd9J-GFLSHnA&s",
    },
    {
      name: "صيدليات سيف",
      branch: "فرع المهندسين",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQQ4lrnGeITJzYxM3OiN-mgzd9J-GFLSHnA&s",
    },
  ];

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto "
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Gradient Left */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

        {/* Slider */}
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: pharmacies.length * 2500 + "ms",
          }}
        >
          <div className="flex m-5">
            {[...pharmacies, ...pharmacies].map((pharmacy, index) => (
              <div
                key={index}
                className="w-64 mx-4 h-[20rem] relative group hover:scale-95 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  className="w-full h-full object-cover"
                />
                <div className="flex flex-col items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/40">
                  <p className="text-white text-xl font-bold">{pharmacy.name}</p>
                  <p className="text-gray-200 text-sm mt-2">{pharmacy.branch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Right */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </>
  );
};

export default PharmacySlider;
