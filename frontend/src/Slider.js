import React, { useState, useEffect } from "react";
import "./slider.css"; // Make sure to import the CSS file

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slides = [
    { image: "/images/slider1.jpg"},
    { image: "/images/slider2.jpg"},
    { image: "/images/slider3.jpg" },
    { image: "/images/slider4.png" },
  ];

  const showSlides = (n) => {
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length); 
    } else {
      setSlideIndex(n);
    }
  };

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showSlides(slideIndex + 1); 
    }, 2000); 

    return () => clearInterval(interval); 
  }, [slideIndex]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`mySlides fade ${slideIndex === index + 1 ? "show" : ""}`}
        >
          <div className="numbertext">{index + 1} / {slides.length}</div>
          <img src={slide.image} alt={slide.caption} style={{ width: "100%" }} />
          <div className="text">{slide.caption}</div>
        </div>
      ))}

      <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
      <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

      <div style={{ textAlign: "center" }}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
            onClick={() => currentSlide(index + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
