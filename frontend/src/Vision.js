import React, { useEffect } from "react";
import "./home.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Vision = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <div>
 
      <div
        className="container5"
        style={{
          backgroundImage: "url('/images/bg2.png')",
        }}
      >
        {/* Overlay Text */}
        <div className="text-overlay1" data-aos="fade-up">
          <h2>Company Vision</h2>
        

          {/* Section 1 */}
          <div className="vision-item">
            <img
              src="/images/i1.png"
              alt="icon"
              className="vision-icon"
            />
            <div>
              <h2>Commitment to Excellence in the Dual Carbon Era</h2>
              <p>In the era of dual carbon goals, Aofei New Energy adheres to the principles of high standards, high quality, and high returns in its cooperative approach.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="vision-item">
            <img
              src="/images/i2.png"
              alt="icon"
              className="vision-icon"
            />
            <div>
              <h2>Empowering Lives with Innovation</h2>
              <p>We embrace challenges and seize opportunities with the slogan “Aofei, powering your life.”</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="vision-item">
            <img
              src="/images/i3.png"
              alt="icon"
              className="vision-icon"
            />
            <div>
              <h2>Advancing Green Energy for a Sustainable Future</h2>
              <p>We continue to explore opportunities to develop in the new energy sector by actively promoting the application and advancement of green energy.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Vision;
