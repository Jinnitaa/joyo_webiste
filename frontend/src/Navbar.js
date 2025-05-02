import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";
import {Globe } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Brand</h1>
        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="/">About Us</a></li>
          <li className="dropdown">
            <a href="#solution">Solution</a>
            <ul className="dropdown-menu">
              <li><a href="residence"> Residential Solar PV Installation</a></li>
              <li><a href="commercial">Commercial Solar PV Installation</a></li>
              <li><a href="household">Household PV Energy Storage</a></li>
              <li><a href="industrial">Commercial and Industrial PV Energy </a></li>
              <li><a href="solar-micro">Solar Micro-grid System </a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a>Product</a>
            <ul className="dropdown-menu">
              <li><a href="inverter"> Energy storage Inverter</a></li>
              <li><a href="battery">Batery</a></li>
              <li><a href="pv-module">PV Module</a></li>
            </ul>
          </li>
          <li><a href="case">Case</a></li>
          <li><a href="faq">FAQ</a></li>
          <li><a href="contact-us">Contact</a></li>
          <li><a href="language"><Globe /> </a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
