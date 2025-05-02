import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./household.css";

const Industrial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <div>
      <div
        className="container4"
        style={{
          backgroundImage: "url('/images/bg5.png')",
        }}
      >
        {/* Overlay Text */}
        <div className="text-overlay2" data-aos="fade-up">
          <h2>Household PV Energy Storage Solution</h2>
          <p>
            Save The Earth While Unlocking Greater Cost Savings. Install solar panels, inverter, and batteries at your home. Save costs and sell back surplus electricity to the grid.
          </p>
          {/* Button */}
          <button className="solar-button">Get a Free Quote</button>
        </div>
      </div>
      <div className="grey-line"></div>
      <div className="features-container" data-aos="fade-up">
        <div className="text-section">
          <div className="green-line"></div>
          <h1>Why should we use solar power?</h1>
          <p>
            Solar energy is an inexhaustible source of power that generates electricity without producing carbon dioxide or other pollutants, making it truly clean energy. Solar power generation technology is increasingly becoming the optimal solution for people to address energy crises and achieve sustainable development.
          </p>
        </div>

        <div className="features-image">
          <img src="/images/h1.png" alt="Solar House" />
        </div>
      </div>

      <div className="diagram-container">
        <img src="/images/bg6.png" alt="Diagram" className="diagram-image" />


        <div className="diagram-text diagram-text1">
          <div className="icon" style={{ color: "green" }}>➕</div>
          <p>
            During the day, basked in sunlight, the energy storage system converts solar energy into "green" electricity for home use.
          </p>
        </div>

        <div className="diagram-text diagram-text2">
          <div className="icon">➕</div>
          <p>
            When a blackout happens, the energy storage system seamlessly transitions into becoming the home's primary energy source, ensuring uninterrupted operation of critical appliances.
          </p>
        </div>

        <div className="diagram-text diagram-text3">
          <div className="icon">➕</div>
          <p>
            As night falls, the energy storage system harnesses electricity stored in the battery during the day to consistently provide a continuous supply of green energy.
          </p>
        </div>
      </div>

      {/* Image Slider Section */}
    
    <div className="Section_body">
      <div className="c">
        <input type="radio" name="a" id="cr-1" defaultChecked />
        <label htmlFor="cr-1" style={{ "--hue": 32 }}></label>
        <div className="ci" style={{ "--z": 4 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>Seamless and Uninterrupted Solution</h2>
        <p style={{color:"white"}}>All series inverters can be connected to diesel generators. In case of power outage and poor sunlight conditions, diesel can still be used to ensure electricity.</p>
      </div>
      <img src="/images/h2.png" alt="Diagram" className="diagram-image" />

        </div>

        <input type="radio" name="a" id="cr-2" />
        <label htmlFor="cr-2" style={{ "--hue": 82 }}></label>
        <div className="ci" style={{ "--z": 3 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>Reliable and efficient system</h2><br/>
        <p style={{color:"white"}}>Stable performance against harsh environments <br/>
1. HALT test.<br/>
2. Extreme high and low temperature test.<br/>
3. Salt spray test.<br/>
4. Full load aging test.</p>
      </div>
          <img src="/images/h5.png" alt="Diagram" className="diagram-image" />
        </div>

        <input type="radio" name="a" id="cr-3" />
        <label htmlFor="cr-3" style={{ "--hue": 40 }}></label>
        <div className="ci" style={{ "--z": 2 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>2 times DC overmatching
        1.5 times DC input power</h2> <br/>
        <p style={{color:"white"}}>Supports up to 200% DC overmatching,allowing efficient conversion of solar energy,and storage of excess energy in batteries for night or backup usage.</p>
</div>
          <img src="/images/h4.png" alt="Diagram" className="diagram-image" />
        </div>

        <input type="radio" name="a" id="cr-4" />
        <label htmlFor="cr-4" style={{ "--hue": 210 }}></label>
        <div className="ci" style={{ "--z": 1 }}>
        <div className="ch">
        <h2 style={{ "--h": 32, "--s": "80%", "--l": "90%" }}>It's fast charging</h2> <br/>
        <p style={{color:"white"}}>With the improvement of charging efficiency,
more electricity can be stored in the same
period of time</p>
</div>
          <img src="/images/h6.png" alt="Diagram" className="diagram-image" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Industrial;
