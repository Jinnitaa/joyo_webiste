import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './case.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloudUpload } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';

const FaqUpdateForm = () => {
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // FAQ ID from URL params

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Fetch FAQ data for editing
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/faqs/${id}`);
        setFaqData(response.data);
      } catch (error) {
        console.error('Error fetching FAQ:', error);
        alert('Error fetching FAQ data. Please try again later.');
      }
    };

    if (id) {
      fetchFaq();
    }
  }, [id]);

  const handleChange = (e) => {
    setFaqData({ ...faqData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:5000/api/faqs/${id}`, faqData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      alert('FAQ Updated Successfully');
      navigate('/cms/faqList');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      alert(error.response?.data?.message || 'Error updating FAQ. Please try again later.');
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
            <h1>Update FAQ</h1>
            <small>Modify the question and answer below</small>
          </div>

          <form onSubmit={handleSubmit} className="faq-form">
            <div className="form-left">
              <h4>Question:</h4>
              <input type="text" name="question" value={faqData.question} onChange={handleChange} required />

              <h4>Answer:</h4>
              <textarea name="answer" value={faqData.answer} onChange={handleChange} required rows={6} />

            </div>

            <div className="form-submit">
              <button type="submit" className="submit-button">Update FAQ</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default FaqUpdateForm;
