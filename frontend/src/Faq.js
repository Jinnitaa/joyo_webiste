import React, { useState, useEffect } from 'react';
import './faq.css';
import { CgMathPlus } from "react-icons/cg";
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const CustomerFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      {/* Header */}
      <div className="faq-header">
        <h1>How can we help you?</h1>
        <p>Browse our FAQ page for answers to common questions. If you need further assistance, feel free to reach out!</p>
        <form className="faq-search" onSubmit={(e) => e.preventDefault()}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Type keywords here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Search.svg"
              alt="search"
            />
          </div>
        </form>
      </div>

      {/* FAQ List */}
      <div className="faq-card">
        <h2>Frequently Asked Questions</h2>

        {filteredFaqs.map((faq, index) => (
          <div key={faq._id}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <p>{faq.question}</p>
              <span className={activeIndex === index ? 'rotate' : ''}><CgMathPlus /></span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
{/* How Solar Works Section */}
<div className="solar-works">
        <h2>How Solar Works ?</h2>
        <div className="solar-content">
          <img
            src="/images/s8.png" 
            alt="How Solar Works Diagram"
            className="solar-image"
          />
          <div className="solar-steps">
            <div className="solar-step">
              <strong>Step 1:</strong> Direct current (DC) electricity is generated when sunlight hits the solar panel.
            </div>
            <div className="solar-step">
              <strong>Step 2:</strong> DC is converted into alternating current (AC) using an inverter.
            </div>
            <div className="solar-step">
              <strong>Step 3:</strong> Electricity will enter your distribution board (DB box) to power up your premise.
            </div>
            <div className="solar-step">
              <strong>Step 4:</strong> Excess solar will be sold to the local Grid and you get paid for it.
            </div>
            <div className="solar-step">
              <strong>Step 5:</strong> At night, you can continue to enjoy electricity from your retailer if required.
            </div>
          </div>
        </div>
      </div>
      


    </div>
  );
};

export default CustomerFaq;
