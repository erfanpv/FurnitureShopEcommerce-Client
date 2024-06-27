import React, { useState, useEffect } from "react";
import Slide1 from "../../../assets/Images/Slide-1.jpg";
import Slide2 from "../../../assets/Images/Slide-2.jpg";
import Slide3 from "../../../assets/Images/Slide-3.jpg";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      imgSrc: Slide1,
      label: "Wood Gallery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestias eligendi ducimus excepturi voluptatem ipsam amet unde ab debitis suscipit, recusandae ratione iste cupiditate porro mollitia maxime dolores cum reiciendis?",
    },
    {
      imgSrc: Slide2,
      label: "Wood Gallery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam reprehenderit fugit temporibus distinctio repudiandae accusamus nam quam sint quod accusantium aperiam, minima consequuntur ab doloremque nesciunt deleniti totam officiis voluptas!",
    },
    {
      imgSrc: Slide3,
      label: "Wood Gallery",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eius, aperiam libero asperiores ipsa, consectetur voluptate explicabo eaque fuga voluptatibus tempora velit assumenda labore, ex soluta distinctio? Voluptate, est temporibus.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slides every 3 seconds (3000ms)

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures effect runs only once on component mount

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
                <h5>{slide.label}</h5>
                <p>{slide.description}</p>
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
