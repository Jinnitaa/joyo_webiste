import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpenDropdown(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropdownClick = (name) => {
    if (isMobile) {
      setOpenDropdown((prev) => (prev === name ? null : name));
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Brand</h1>
        <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={currentPath === "/" ? "active" : ""}>
              ABOUT US
            </Link>
          </li>

          <li
            className={`dropdown ${
              openDropdown === "solution" ? "open-dropdown" : ""
            } ${
              currentPath.includes("/residence") ||
              currentPath.includes("/commercial") ||
              currentPath.includes("/household") ||
              currentPath.includes("/industrial") ||
              currentPath.includes("/solar-micro")
                ? "active"
                : ""
            }`}
            onClick={(e) => handleDropdownClick("solution")}
            onMouseEnter={() => !isMobile && setOpenDropdown("solution")}
            onMouseLeave={() => !isMobile && setOpenDropdown(null)}
          >
            <Link to="#">SOLUTION</Link>
            <ul className={`dropdown-menu ${openDropdown === "solution" ? "open" : ""}`}>
              <li><Link to="/residence">Residential Solar PV Installation</Link></li>
              <li><Link to="/commercial">Commercial Solar PV Installation</Link></li>
              <li><Link to="/household">Household PV Energy Storage</Link></li>
              <li><Link to="/industrial">Commercial and Industrial PV Energy</Link></li>
              <li><Link to="/solar-micro">Solar Micro-grid System</Link></li>
            </ul>
          </li>

          <li
            className={`dropdown ${
              openDropdown === "product" ? "open-dropdown" : ""
            } ${
              currentPath.includes("/inverter") ||
              currentPath.includes("/battery") ||
              currentPath.includes("/pv-module")
                ? "active"
                : ""
            }`}
            onClick={(e) => handleDropdownClick("product")}
            onMouseEnter={() => !isMobile && setOpenDropdown("product")}
            onMouseLeave={() => !isMobile && setOpenDropdown(null)}
          >
            <Link to="#">PRODUCT</Link>
            <ul className={`dropdown-menu ${openDropdown === "product" ? "open" : ""}`}>
              <li><Link to="/inverter">Energy storage Inverter</Link></li>
              <li><Link to="/battery">Battery</Link></li>
              <li><Link to="/pv-module">PV Module</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/case" className={currentPath === "/case" ? "active" : ""}>
              CASE
            </Link>
          </li>
          <li>
            <Link to="/faq" className={currentPath === "/faq" ? "active" : ""}>
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className={currentPath === "/contact-us" ? "active" : ""}>
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
