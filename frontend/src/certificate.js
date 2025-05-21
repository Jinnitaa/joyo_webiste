import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const Certificate = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const slidesPerView = 4;
const API_BASE_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {

    const fetchCertificates = async () => {
      setLoading(true);
      try {
       const response = await axios.get(`${baseURL}/api/qualifications`);
        console.log("Fetched certificates:", response.data);

        // Ensure the response is an array before setting state
        if (Array.isArray(response.data)) {
          setCertificates(response.data);
        } else if (Array.isArray(response.data.data)) {
          setCertificates(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setCertificates([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        alert("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
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
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex, certificates]);

  return (
    <section className="certificate_container">
      <div className="section-header">Performance</div>

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
          ) : Array.isArray(certificates) && certificates.length > 0 ? (
            certificates.map((cert, index) => (
              <div key={index} className="slide">
                <img
                  src={`${baseURL}uploads/${cert.image}`}
                  alt={`Certificate ${index + 1}`}
                  width="100"
                  height="100"
                />
              </div>
            ))
          ) : (
            <p>No certificates available.</p>
          )}
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  );
};

export default Certificate;
