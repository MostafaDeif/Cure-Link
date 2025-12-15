import React from "react";
import { motion } from "framer-motion";

export function BannerSlider() {
  const images = [
    "https://via.placeholder.com/1200x400?text=Banner+2",
    "https://via.placeholder.com/1200x400?text=Banner+2",
    "https://via.placeholder.com/1200x400?text=Banner+3",
  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const MotionImg = motion.img;

  return (
    <div className="w-full h-full">
      <MotionImg
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={images[index]}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
