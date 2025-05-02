import React, { useState } from "react";
import './contact.css';
import { FaMapLocation } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const ContactUs = () => {
  // State to handle form input values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (!fullName || !email || !message) {
      setError("Please fill out all fields");
      return;
    }

    try {
   
      const response = await axios.post('http://localhost:5000/api/contacts/createContact', {
        fullName,
        email,
        message
      });

      // On successful submission
      setSuccessMessage('Your message has been sent successfully!');
      setError(null); // Clear any previous error
      setFullName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      // Handle errors
      setError('There was an error sending your message.');
      console.error(error);
    }
  };

  return (
    <div
      className="contact-container"
      style={{ backgroundImage: 'url("/images/bb3.png")' }} // 👈 Your preferred way
    >
      {/* Content */}
      <div className="contact-content">
        <div className="header">
          <h1>Contact Us</h1>
          <p style={{ color: "white" }}>
            Have questions or need assistance? We're here to help! Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-info">
          <div className="info">
            <h4 style={{ color: "green" }}><FaMapLocation style={{ color: "green" }} /> Address</h4>
            <p>6777 Sugar Camp Road,<br />Owatonna, Minnesota, 55099</p>
            <br />
            <h4 style={{ color: "green" }}><FaPhone /> Phone</h4>
            <p>505-345-6785-6678</p>
            <br />
            <h4 style={{ color: "green" }}><MdEmail /> Email</h4>
            <p>adan@mail.com</p>
          </div>

          <div className="form">
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // Update state on input change
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
              <textarea
                placeholder="Type your Message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update state on input change
              />
              <button type="submit">Send</button>
            </form>

            {/* Show success or error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
