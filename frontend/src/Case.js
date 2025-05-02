import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./case.css"; // your CSS file
import axios from "axios";

const Case = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchCases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cases");
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div className="container4" style={{ backgroundImage: "url('/images/bg24.png')" }}>
        <div className="text-overlay2" data-aos="fade-up">
          <h2>Our Project Case</h2>
          <p>Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter and batteries at your home. Save costs and sell back surplus electricity back to the grid.</p>
        </div>
      </div>
{/* Project Cards Section */}
<div className="case-cards-section">
  <h3 className="solar-title" data-aos="fade-up">Solar Installation</h3> {/* NEW TITLE */}
  <div className="case-cards-wrapper">
    {cases.map((caseItem) => (
      <div className="case-card" key={caseItem._id} data-aos="fade-up">
        {caseItem.image && (
          <div className="case-card-image">
            <img
              src={`http://localhost:5000/uploads/${caseItem.image}`}
              alt={caseItem.companyName}
            />
          </div>
        )}
        <div className="case-card-content">
          <div className="green-line"></div>
          <h4 className="green-title">{caseItem.companyName}</h4>
          <p><strong>Location:</strong> {caseItem.location}</p>
          <p><strong>Installed Capacity:</strong> {caseItem.installedCapacity}</p>
          <p><strong>Investment:</strong> {caseItem.investmentAmount}</p>
          <p><strong>Annual Generation:</strong> {caseItem.annualGeneration}</p>
          <p><strong>Save Coal:</strong> {caseItem.saveStandardCoal}</p>
          <p><strong>CO₂ Reduction:</strong> {caseItem.reductionOfEmission}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default Case;
