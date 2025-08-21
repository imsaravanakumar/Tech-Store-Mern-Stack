import React, { useState, useEffect, useRef } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Carousel = ({ images, interval = 6000 }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const total = images.length;

  const nextSlide = () => setIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [index, interval]);

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
              alt={obj.name}
              className="w-full h-full object-cover"
            />

            {/* Overlay with Title */}
            {i === index && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <h1 className="font-extrabold text-amber-400 text-3xl sm:text-5xl md:text-7xl uppercase animate-fadeInUp">
                  {obj.name}
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 
        text-white text-2xl sm:text-3xl p-2 bg-white/20 backdrop-blur-md rounded-full 
        hover:bg-amber-400 hover:text-black transition"
      >
        <BiLeftArrow />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 
        text-white text-2xl sm:text-3xl p-2 bg-white/20 backdrop-blur-md rounded-full 
        hover:bg-amber-400 hover:text-black transition"
      >
        <BiRightArrow />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2 z-10">
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

export default Carousel;
