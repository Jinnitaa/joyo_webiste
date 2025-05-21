import React, { useState } from 'react';
import axios from 'axios';
import './product.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
const baseURL = process.env.REACT_APP_API_BASE_URL;
const FaqCreateForm = () => {
  const [faq, setFaq] = useState({
    question: '',
    answer: ''
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setFaq({ ...faq, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    await axios.post(`${baseURL}/api/faqs/createFaq`, faq);
      alert('FAQ Created Successfully');
      navigate('/cms/faqList');
    } catch (error) {
      console.error('Error creating FAQ:', error);
      alert(error.response?.data?.message || 'Error creating FAQ. Please try again later.');
    }
  };

  return (
    <div className="faq-form-container">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? '' : 'full'}`}>
        <header>
          <div className="header-content">
            <span className="menu-toggle-icon" onClick={toggleSidebar}>
              <RxHamburgerMenu />
            </span>
          </div>
        </header>

        <main>
          <div className="page-header">
            <h1>Create FAQ</h1>
            <small>Fill in the details to create a new FAQ</small>
          </div>

          <form onSubmit={handleSubmit} className="faq-form">
            <div className="form-group">
              <h4>Question:</h4>
              <input
                type="text"
                name="question"
                value={faq.question}
                onChange={handleChange}
                required
              />

              <h4>Answer:</h4>
              <textarea
                name="answer"
                value={faq.answer}
                onChange={handleChange}
                required
              />

              <div className="form-submit">
                <button type="submit" className="submit-button">Create FAQ</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default FaqCreateForm;