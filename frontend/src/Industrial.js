import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./industrial.css";
import { Link } from 'react-router-dom';

const ImageSwitcher = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="switcher-container" onClick={handleClick}>
      <img
        src={isToggled ? "/images/k1.png" : "/images/k2.png"}
        alt="Switching Icon"
        className="switcher-image"
        data-aos="flip-up"
      />
      <p className="switcher-text"  data-aos="flip-up">
        {isToggled ? "Interact with smart meters such as the DTSU666-CT from Aofei." : " Each port can communicate with up to 20 inverters in cascading daisy chain. "}
      </p>
      <br/>
      <br/>
      
    </div>
   
  );
};

const Industrial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <div
        className="container4"
        style={{
          backgroundImage: "url('/images/bg7.png')",
        }}
      >
        <div className="text-overlay2" data-aos="fade-up">
          <h2>Commercial and Industrial Energy Storage System</h2>
          <p>
            Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter, and batteries at your home. Save costs and sell back surplus electricity to the grid.
          </p>
          <br></br>
          <Link to="/contact-us">
           <button className="solar-button">Get a Free Quote</button>
         </Link>
        </div>
      </div>

      <div className="grey-line"></div>

      <div className="features-container2" data-aos="fade-up">
        <div className="text-section">
          <div className="green-line"></div>
          <h2>The average Payback</h2>
          <p>
            The average payback period for a 1 MW aofei plant is around 3 years with local subsidies, and about 5 years without subsidies. However, the actual payback time depends on various factors, such as local regulations, power consumption, and on-grid tariff policies.
          </p>
        </div>
      </div>

      <br />
      <br />
      <div className="industrial_text"  data-aos="flip-up">
        <h2>AOFEI C&I PV inverters + DataHub 1000 = Zero Feed-in Control</h2>
      </div>

      <div className="diagram-container">
        <img
          src="/images/bg8.png"
          alt="Diagram"
          className="diagram-image"
          style={{ width: "1000px", display: "block", marginLeft: "0" }}
        />

        <div className="diagram-text diagram-text1" data-aos="flip-up">
          <div className="icon" style={{ color: "green" }}>➕</div>
          <p>
            All the inverter data can be monitored on Aofei Cloud platform.
          </p>
        </div>

        <div className="diagram-text diagram-text2" data-aos="flip-up">
          <div className="icon">➕</div>
          <p>
            These plants can be built on building rooftops or open spaces to form self-contained power plants and generate profits by selling excess electricity to the grid.
          </p>
        </div>

        <div className="diagram-text diagram-text3" data-aos="flip-up">
          <div className="icon">➕</div>
          <p>
            With all C&I inverters connected to the 3 available RS485 ports on DataHub1000, the output power and export power of the whole power plant can be set and controlled in accordance to the site requirements.
          </p>
        </div>
      </div>

      <div className="diagram-wrapper">
        <div className="image-container" data-aos="fade-right">
          <img
            src="/images/bg9.png"
            alt="Diagram"
            className="diagram-image"
          />
        </div>

        <div className="text-container" data-aos="fade-left">
          <div className="text-point text-support">
            <img src="/images/ic1.png" alt="Support Icon" className="icon-img" />
            <p><strong>Support up to <b>60</b> units of on-grid inverters</strong></p>
          </div>

          <div className="text-point text-inverters">
            <img src="/images/ic1.png" alt="Inverter Icon" className="icon-img" />
            <p><strong>Compatible String Inverters</strong></p>
          </div>

          <div className="text-point text-device">
            <img src="/images/ic1.png" alt="Device Icon" className="icon-img" />
            <p><strong>Device</strong></p>
          </div>
        </div>
      </div>

     
      <ImageSwitcher />
    </div>
  );
};

export default Industrial;
