import React, { useEffect, useState } from 'react';
import './contact.css';
import { FaMapLocation, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import './inverter.css';
import AOS from "aos";
import "aos/dist/aos.css";

const ContactUs = () => {
 useEffect(() => {
          AOS.init({ duration: 1000, once: true }); 
        }, []); 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!fullName || !email || !phone || !message) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/contacts/createContact`, {
        fullName,
        email,
        phone,
        message
      });

      setSuccessMessage('Your message has been sent successfully!');
      setError(null);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      setError('There was an error sending your message.');
      console.error(error);
    }
  };

  return (
    <div
      className="contact-container"
      style={{ backgroundImage: 'url("/images/bb3.png")' }}
    >
      <div className="contact-content"  >
        <div className="header" data-aos="fade-up">
          <h1>Contact Us</h1>
          <p style={{ color: "white" }}>
            Have questions or need assistance? We're here to help! Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-info" data-aos="fade-right">
          <div className="info">
            <h4 style={{ color: "#27B964" }}><FaMapLocation /> Address</h4>
            <p>6777 Sugar Camp Road,<br />Owatonna, Minnesota, 55099</p>

            <h4 style={{ color: "#27B964" }}><FaPhone /> Phone</h4>
            <p>505-345-6785-6678</p>

            <h4 style={{ color: "#27B964" }}><MdEmail /> Email</h4>
            <p>adan@mail.com</p>
          </div>

          <div className="form" data-aos="fade-left">
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Type your Message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
