import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const Certificate = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const slidesPerView = 4;

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true); // Show loading state
      try {
        const response = await axios.get("http://localhost:5000/api/qualifications"); // Adjust API endpoint if necessary
        setCertificates(response.data); // Assuming the response contains an array of certificates
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        alert("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchCertificates();
  }, []);

  const totalSlides = certificates.length;

  const nextSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex + slidesPerView >= totalSlides ? 0 : prevIndex + slidesPerView
    );
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex - slidesPerView < 0 ? totalSlides - slidesPerView : prevIndex - slidesPerView
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slideIndex, certificates]);

  return (
    <section className="certificate_container">
      <div className="section-header">
        Performance
      </div>

      <div className="carousel-container">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <div
          className="slide_wrapper"
          style={{
            transform: `translateX(-${(slideIndex * 100) / slidesPerView}%)`,
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            certificates.map((cert, index) => (
              <div key={index} className="slide">
                {/* Displaying the certificate image */}
                <img
                  src={`http://localhost:5000/uploads/${cert.image}`} // Assuming the image URL comes from the backend
                  alt={`Certificate ${index + 1}`}
                  width="100"
                  height="100"
                />
              </div>
            ))
          )}
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  );
};

export default Certificate;
