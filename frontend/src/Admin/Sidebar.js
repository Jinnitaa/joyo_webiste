import React from "react";
import "./sidenav.css"; 
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineCases } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
import { PiSignOutBold } from "react-icons/pi"; 
import { MdProductionQuantityLimits } from "react-icons/md"; 
import { MdSupportAgent } from "react-icons/md";           

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`sidebar ${!isSidebarOpen ? "closed" : ""}`}>
      <div className="side-header">
      </div>
      <div className="profile">
  <img className="profile-img" src="/images/ad1.png" alt="admin" />
  <h4 style={{ textAlign: "center" }}>Admin User</h4>
</div>
        <div className="header-line"></div>
      <div className="side-menu">
        <ul>
          <li>
            <a href="/cms/productList">
              <MdProductionQuantityLimits className="sidebar-icon" />
              <span> Products</span>
            </a>
          </li>
          <li>
            <a href="/cms/caseList">
              <MdOutlineCases className="sidebar-icon" />
              <span> Cases</span>
            </a>
          </li>
          <li>
            <a href="/cms/faqList">
            <TbMessageQuestion />
              <span> FAQ</span>
            </a>
          </li>
          <li>
            <a href="/cms/qualificationList">
            <PiCertificate />
              <span> Qualification</span>
            </a>
          </li>
          <li>
            <a href="/cms/contactList">
              <MdSupportAgent className="sidebar-icon" />
              <span> Support</span>
            </a>
          </li>
          <li>
            <a href="#">
              <PiSignOutBold className="sidebar-icon" />
              <span> Signout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
