import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./solar.css";

const Micro = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <div>
      <div
        className="container4"
        style={{
          backgroundImage: "url('/images/bg10.png')",
        }}
      >
        {/* Overlay Text */}
        <div className="text-overlay2" data-aos="fade-up">
          <h2>Solar Micro-Grid System</h2>
          <p>
            Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter, and batteries at your home. Save costs and sell back surplus electricity to the grid.
          </p>
          {/* Button */}
          <button className="solar-button">Get a Free Quote</button>
        </div>
      </div>
      <div className="grey-line"></div>
      <div className="features-container2" data-aos="fade-up">
        <div className="text-section">
          <div className="green-line"></div>
          <h1>Diesel Generator Companion</h1>
          <p>
          AOFEI seek to achieve “diesel generator’s 2.0 era” through “diesel generator companion” which improves efficiency by optimizing energy consumption based on variable load usage. This environmental preservation effort helps businesses realize direct cost savings while reducing diesel usage, noise pollution and carbon emission.
          </p>
          <br/>
          <br/>
        </div>
      </div>
      {/* Image Slider Section */}
    
    <div className="Section_body">
      <div className="c">
        <input type="radio" name="a" id="cr-1" defaultChecked />
        <label htmlFor="cr-1" style={{ "--hue": 32 }}></label>
        <div className="ci" style={{ "--z": 4 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>NO ELECTRICITY SUPPLY</h2>
       
      </div>
      <img src="/images/s1.jpg" alt="Diagram" className="diagram-image" />

        </div>

        <input type="radio" name="a" id="cr-2" />
        <label htmlFor="cr-2" style={{ "--hue": 82 }}></label>
        <div className="ci" style={{ "--z": 3 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>UNSTABLE ELECTRIC SUPPLY</h2><br/>
      </div>
          <img src="/images/s2.jpg" alt="Diagram" className="diagram-image" />
        </div>

        <input type="radio" name="a" id="cr-3" />
        <label htmlFor="cr-3" style={{ "--hue": 40 }}></label>
        <div className="ci" style={{ "--z": 2 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>HIGH DIESEL PRICE</h2> <br/>
       
</div>
          <img src="/images/s3.jpg" alt="Diagram" className="diagram-image" />
        </div>

        <input type="radio" name="a" id="cr-4" />
        <label htmlFor="cr-4" style={{ "--hue": 210 }}></label>
        <div className="ci" style={{ "--z": 1 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>NOISE-SENSITIVE ENVIRONMENTS</h2> <br/>
        
</div>
          <img src="/images/s4.jpg" alt="Diagram" className="diagram-image" />
        </div>
      </div>
      </div>

      <section className="image-section">
      <div className="section-header">
      Operation Mode
      </div>

      <div className="image1-container">
        <div className="image1-card">
          <div className="overlay">
            <span className="large-text" data-aos="fade-up">Small scale</span>
            <span className="small-text" data-aos="fade-up" data-aos-offset="100">Farm/Construction Site</span>
          </div>
          <img src="/images/1.jpg" alt="Image 1" />
        </div>
        <div className="image1-card">
          <div className="overlay">
            <span className="large-text" data-aos="fade-up">Medium scale</span>
            <span className="small-text" data-aos="fade-up" data-aos-offset="100">Island</span>
          </div>
          <img src="/images/2.jpg" alt="Image 2" />
        </div>
        <div className="image1-card">
          <div className="overlay">
            <span className="large-text" data-aos="fade-up">Large scale</span>
            <span className="small-text" data-aos="fade-up "data-aos-offset="100">Mines/Factories In Underdeveloped Areas</span>
          </div>
          <img src="/images/3.jpg" alt="Image 3" />
        </div>
      </div>

    </section>
    <div className="solar-diagram"> <img src="/images/bg11.png" alt="Image 3" /></div>
   

    </div>
  );
};

export default Micro;
