import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./case.css";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const Case = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchCases = async () => {
      try {
       const response = await axios.get(`${baseURL}/api/cases`);
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
          <p>
            Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter and batteries at your home. Save costs and sell back surplus electricity back to the grid.
          </p>
        </div>
      </div>
      <div className="grey-line"></div>
   
      <div className="case-cards-section">
        <h3 className="solar-title" data-aos="fade-up">Solar Installation</h3>
        <div className="case-cards-wrapper">
          {cases.map((caseItem, index) => (
            <div className="case-card" key={caseItem._id} data-aos="fade-up">
              {caseItem.image && (
                <div className="case-card-image">
                  <img
                    src={`${baseURL}/uploads/${caseItem.image}`}
                    alt={caseItem.companyName}
                  />
                </div>
              )}
              <div className="case-card-content">
                {/* Number Badge at top right */}
                <div className="corner-number">{index + 1}</div>

                <div className="green-line"></div>
                <h4 className="green-title">{caseItem.companyName}</h4>
                <p><strong>Location:</strong> {caseItem.location}</p>
                <p><strong>Installed Capacity:</strong> {caseItem.installedCapacity}</p>

                {caseItem.investmentAmount && (
                  <p><strong>Investment:</strong> {caseItem.investmentAmount}</p>
                )}
                {caseItem.annualGeneration && (
                  <p><strong>Annual Generation:</strong> {caseItem.annualGeneration}</p>
                )}
                {caseItem.saveStandardCoal && (
                  <p><strong>Save Coal:</strong> {caseItem.saveStandardCoal}</p>
                )}
                {caseItem.reductionOfEmission && (
                  <p><strong>CO₂ Reduction:</strong> {caseItem.reductionOfEmission}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Case;
