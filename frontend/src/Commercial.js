import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./commercial.css";

const Commercial = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS
      }, []); 
      const phases = [
        { title: "Step 1", description: "Consultation & Assessment", icon: "/images/s7.png" },
        { title: "Step 2", description: "Site Visit & Due Diligence", icon: "/images/s3.png" },
        { title: "Step 3", description: "Proposal Review & Acceptance", icon: "/images/s4.png" },
        { title: "Step 4", description: "Solar System Installation", icon: "/images/s5.png" },
        { title: "Step 5", description: "Grid-connection Acceptance & Earn Savings", icon: "/images/s6.png" },
      ];
      
  return (
    <div >

<div
        className="container4"
        style={{
          backgroundImage: "url('/images/bg4.png')",
        }}
      >
         {/* Overlay Text */}
         <div className="text-overlay2" data-aos="fade-up">
          <h2>Commercial Solar Installation</h2>
          <p>Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter and batteries at your home. Save costs and sell back surplus electricity back to the grid.</p>
          <br></br>{/* Button */}
        <button className="solar-button">Get a Free Quote</button>
        </div>

 
      </div>
      <div className="grey-line"></div>

        <div className="features-container" data-aos="fade-up">
      <div className="features-text">
        <div className="feature-item">
          <img src="/images/c2.png" alt="No Upfront Costs" />
          <p>No Upfront Costs</p>
        </div>
        <div className="feature-item">
          <img src="/images/c3.png" alt="Immediate Cost Savings" />
          <p>Immediate Cost Savings via Low Solar Tariff</p>
        </div>
        <div className="feature-item">
          <img src="/images/c4.png" alt="No Price Fluctuations" />
          <p>No Price Fluctuations</p>
        </div>
        <div className="feature-item">
          <img src="/images/c5.png" alt="Integrated Services" />
          <p>Integrated Operation and Maintenance Services</p>
        </div>
      </div>
      <div className="features-image">
        <img src="/images/c1.png" alt="Solar House" />
      </div>
    </div>
           {/* Project Development Phases Section */}
<div className="process-container">
  <h2 className="section-header" data-aos="fade-up">Project Development Phases</h2>
  <br></br>
  <br></br>
  <div className="phases-grid"> {/* Changed from steps-grid */}
    {phases.map((phase, index) => ( /* Changed steps to phases */
      <div key={index} className="phases-card" data-aos="fade-up" data-aos-delay={(index + 1) * 100}> {/* Changed steps-card */}
        <img src={phase.icon} alt={`Phase ${index + 1}`} className="phases-icon" /> {/* Changed steps.icon */}
        <h3 className="phases-title">{phase.title}</h3> {/* Changed steps.title */}
        <p className="phases-description">{phase.description}</p> {/* Changed steps.description */}
      </div>
    ))}
  </div>
</div>

<div className="pricing-container">
     <h2 className="section-header" data-aos="fade-up">Pricing</h2>
      <div className="pricing-boxes">
        {/* MSPPA Box */}
        <div className="pricing-box mspa-box">
          <h3 className="pricing-header">MSPPA</h3>
          <p className="pricing-subtitle">Affordable & Hassle-free</p>
          <p className="pricing-highlight">Higher monthly discounts</p>
          <ul className="pricing-list">
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              $0 upfront, all licenses and costs of installation covered by provider
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              15-20 years agreement
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Up to x% discount on electricity
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Free maintenance throughout the agreement’s tenure
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Minimum energy guarantee
            </li>
          </ul>
          <button className="quote-button mspa-button">Get a Free Quote</button>
        </div>

        {/* Upfront Purchase Box */}
        <div className="pricing-box upfront-box">
          <h3 className="pricing-header">Upfront Purchase</h3>
          <p className="pricing-description">
            Pay upfront, own your system, enjoy savings and earn passive income from excess solar energy generated!
          </p>
          <p className="pricing-highlight">Pricing depends on site and requirements</p>
          <ul className="pricing-list">
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Own the system immediately
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Inclusive of 1-year warranty & maintenance
            </li>
            <li>
              <img src="/images/a1.png" alt="check" className="check-icon" />
              Subsequent maintenance to be arranged separately at owners’ costs
            </li>
          </ul>
          <button className="quote-button upfront-button">Get a Free Quote</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Commercial;
