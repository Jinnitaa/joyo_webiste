import React, { useEffect } from "react";
import "./home.css";
import AOS from "aos";
import "aos/dist/aos.css";



const ProfileCards = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  const slides = [
    { image: "/images/h1.jpg" },
    { image: "/images/h2.jpg" },
    { image: "/images/h3.png" }
  ];

 

  
  return (
    <div>
      {/* Profile Cards Section */}
      <div className="main-container">
        {/* Text container on the left */}
        <div className="container_h2"  data-aos="fade-right" data-aos-offset="100">
          <h2>JOYO New Energy</h2>
          <br/>
          <p>
            JOYO New Energy Co., Ltd. was established in Guangzhou, China in 2021.
            As a wholly-owned subsidiary of Aofei Data, a company listed on the A-share market
            (stock code: 300738), Aofei New Energy focuses on the distributed photovoltaic market in China.
            The company is dedicated to the investment development, construction management,
            technological research and development, and operational services of distributed photovoltaic projects.
            To date, we have constructed power stations in more than ten provinces across China,
            rapidly emerging as a leader in the industrial and commercial photovoltaic sector.
            <br />
            <br />
            With a global perspective, Aofei New Energy launched its international operations from Singapore in 2023,
            making a full-scale entry into overseas markets to serve both individual and industrial clients.
            Leveraging a strong R&D team and cutting-edge technology concepts, we collaborate with top industry players
            to provide customers with comprehensive, one-stop green energy solutions throughout the entire lifecycle,
            from demand analysis and design planning to construction implementation and subsequent operations.
          </p>
        </div>

        {/* Image cards container on the right */}
        <div className="container_h1">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`profile-card card-${index + 1}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            >
            </div>
          ))}
        </div>
      </div>
 <section className="image-section">
  <div className="section-header">Performance</div>

  <div className="image1-container">
    <div className="image1-card">
      <img src="/images/l1.jpg" alt="Image 1" />
      <div className="overlay">
        <span >20</span>
        <span className="small-text">Cover Countries/Regions</span>
      </div>
    </div>
    <div className="image1-card">
      <img src="/images/l2.jpg" alt="Image 2" />
      <div className="overlay">
        <span className="large-text" data-aos="fade-up">240</span>
        <span className="small-text" data-aos="fade-up" data-aos-offset="100">Solar Power Plants</span>
      </div>
    </div>
    <div className="image1-card">
      <img src="/images/l3.jpg" alt="Image 3" />
      <div className="overlay">
        <span className="large-text">400MWp</span>
        <span className="small-text" data-aos="fade-up" data-aos-offset="100">Capacities</span>
      </div>
    </div>
  </div>
</section>



    
{/* Section with background image */}

<div className="section-header" style={{ 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", 
    marginTop: "50px", 
    textAlign: "center"
  }}>
        Business Model
      </div>
<div

        className="container3"
        style={{
          backgroundImage: "url('/images/bg1.png')", 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        
      >
        <div className="grid">
          
          {[{ title: "B2B", subtitle: "Business-to-Business" },
            { title: "EMC", subtitle: "Energy Management Contract" },
            { title: "PPA", subtitle: "Power Purchase Agreement" }]
            .map((item, index) => (
              <div key={index} className="card" data-aos="flip-left" data-aos-offset="100">
                <div className="circle">{item.title}</div>
                <p className="subtitle" style={{color:"white"}}>{item.subtitle}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
