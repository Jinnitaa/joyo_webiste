import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./solution.css";
import { Link } from 'react-router-dom';

const Residence = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); 
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
          backgroundImage: "url('/images/bg3.png')",
        }}
      >
  
         <div className="text-overlay2" data-aos="fade-up">
          <h2>Residential Solar Installation</h2>
          <p>Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter and batteries at your home. Save costs and sell back surplus electricity back to the grid.</p>
        </div>

 
      </div>

      <div className="grey-line"></div>


          {/* Second Part */}
          <div className="main-container-2">
      <div className="text-section" data-aos="fade-right">
      <div className="green-line"></div>
        <h1>Why should we use solar power?</h1>
        <p>
        Solar energy is an inexhaustible source of power that generates electricity without producing carbon dioxide or other pollutants, making it a truly clean energy. Solar power generation technology is increasingly becoming the optimal solution for people to address energy crises and achieve sustainable development.
        </p>
      </div>
      <div className="image-section" data-aos="fade-left">
        <img src="/images/s2.png" alt="Your description" />
      </div>
    </div>

 {/* Benefits */}
 <div className="benefits-container">
 <div className="section-header">
        Benefits
      </div>
        <div className="benefits-grid two-columns">
          {[
            "Save your electricity bills",
            "Reduce carbon footprint",
            "Sell your surplus back to the grid",
            "Prolong lifespan of your roof",
            "Passive cooling of your house",
            "Increase the valuation of your house"
          ].map((benefit, index) => (
            <div className="benefit-card" key={index} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <span className="benefit-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="benefit-text">{benefit}</span>
            </div>
          ))}
        </div>
      </div>



      
   {/* Project Development Phases Section */}
<div className="process-container">
  <h2 className="section-header" data-aos="fade-up">Project Development Phases</h2>
  <br></br>
  <br></br>
  <div className="phases-grid"> 
    {phases.map((phase, index) => ( 
      <div key={index} className="phases-card" data-aos="fade-up" data-aos-delay={(index + 1) * 100}> 
        <img src={phase.icon} alt={`Phase ${index + 1}`} className="phases-icon" /> 
        <h3 className="phases-title">{phase.title}</h3> 
        <p className="phases-description">{phase.description}</p> 
      </div>
    ))}
  </div>
</div>

 {/* Advantages Section */}
<div className="advantages-container">
<div className="section-header">
        Advantages of the Schemes
      </div>
      <p className="sub-header" data-aos="fade-up" data-aos-delay="100">Zero Burden & Zero Concern</p>
      <div className="advantages-box" data-aos="fade-up" data-aos-delay="200">
        <div className="advantage-item">
          <img src="/images/a1.png" alt="check" className="check-icon" />
          <span>No upfront payment. All license and installation fees are borne by us.</span>
        </div>
        <div className="advantage-item">
          <img src="/images/a1.png" alt="check" className="check-icon" />
          <span>Maintenance-free. We provide maintenance during the agreement period.</span>
        </div>
        <div className="advantage-item">
          <img src="/images/a1.png" alt="check" className="check-icon" />
          <span>It is estimated that we can save you 40% of your electricity bill each month.</span>
        </div>
        <div className="advantage-item">
          <img src="/images/a1.png" alt="check" className="check-icon" />
          <span>Please note that the actual situation may vary in different regions.</span>
        </div>
      </div>
      <Link to="/contact-us">
      <button className="contact-button">Contact Us</button>
      </Link>
    </div>

  
    </div>
  );
};

export default Residence;
