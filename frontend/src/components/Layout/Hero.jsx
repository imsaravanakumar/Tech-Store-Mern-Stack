import React, { useState, useEffect, useRef } from "react";
import IphoneBanner from "../../assets/Phones/banner iphone.png";
import LaptopBanner from "../../assets/Laptops/laptophero.webp";
import WatchBanner from "../../assets/Watchs/Watchbanner.jpg";
import { Link } from "react-router-dom";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Hero = () => {
  const images = [
    {
      image: IphoneBanner,
      productname: "Mobile Phones",
      pagelocation: "/phones",
    },
    {
      image: LaptopBanner,
      productname: "Laptops",
      pagelocation: "/laptops",
    },
    {
      image: WatchBanner,
      productname: "Watches",
      pagelocation: "/watches",
    },
  ];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const total = images.length;

  const nextSlide = () => setIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="relative w-full h-[70vh] md:h-[95vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((obj, i) => (
          <div key={i} className="relative shrink-0 w-full h-full">
            <img
              src={obj.image}
              alt={obj.productname}
              className="w-full h-full object-cover"
            />

            {/* Overlay Content */}
            {i === index && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h1 className="font-extrabold text-white text-4xl md:text-6xl uppercase mb-6 animate-fadeInDown">
                  {obj.productname}
                </h1>
                <Link
                  to={obj.pagelocation}
                  className="text-lg font-semibold text-blackktext-blackktext-blackktext-blacktext-black bg-amber-400 uppercase rounded-full py-2 px-6 shadow-lg hover:bg-amber-500 transition"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 
        bg-white/30 hover:bg-white/60 text-black rounded-full p-2 shadow-lg transition"
      >
        <BiLeftArrow className="text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 
        bg-white/30 hover:bg-white/60 text-black rounded-full p-2 shadow-lg transition"
      >
        <BiRightArrow className="text-2xl" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-amber-400 scale-110" : "bg-white/60"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
