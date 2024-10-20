import React, { useState, useEffect } from "react";
import Slide1 from "../../../assets/Images/Slide-1.jpg";
import Slide2 from "../../../assets/Images/Slide-2.jpg";
import Slide3 from "../../../assets/Images/Slide-3.jpg";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      imgSrc: Slide1,
      label: "Crafted Elegance",
      description:
        "Discover our meticulously crafted furniture that brings elegance and warmth to your home. Each piece is designed to reflect quality and style.",
    },
    {
      imgSrc: Slide2,
      label: "Sustainable Materials",
      description:
        "At Wood Gallery, we prioritize sustainability. Our furniture is made from eco-friendly materials that are both stylish and kind to the environment.",
    },
    {
      imgSrc: Slide3,
      label: "Customize Your Space",
      description:
        "Create your dream space with our customizable furniture options. Tailor the colors and finishes to match your unique style and taste.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []); 

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 flex justify-center mb-4 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100%" }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            height: "100%",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0"
              style={{ height: "100%" }}
            >
              <img
                src={slide.imgSrc}
                className="block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
                style={{ height: "85vh" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-black bg-opacity-50 text-white">
                <h5 className="text-xl font-bold">{slide.label}</h5>
                <p className="mt-2">{slide.description}</p>
                <p>
                  <a href="#" className="btn btn-warning mt-3">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
