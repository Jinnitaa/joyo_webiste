import React from "react";
import "./home.css";
import { IoTimeSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
       
        <div className="footer-section left">
          <h3>Operation Hours</h3>
          <div className="footer-item">
            <span className="icon"><IoTimeSharp style={{ color: "whitesmoke" }} /></span>
            <p>09:00 - 18:00</p>
          </div>
          <div className="footer-item">
            <span className="icon"><FaPhoneAlt  style={{ color: "whitesmoke" }} /></span>
            <p>Phone number</p>
          </div>
          <div className="footer-item">
            <span className="icon"><MdEmail  style={{ color: "whitesmoke" }} /></span>
            <p>Email</p>
          </div>
        </div>


        <div className="footer-section right">
          <h3>Contact Us</h3>
          <strong>JOYO New Energy</strong>
          <p className="footer-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
          </p>
        </div>
      </div>


      <div className="footer-copyright">© Copyright 2025</div>
    </footer>
  );
};

export default Footer;
