// AnalyticsCard.jsx
import React from "react";
import "./cms.css"; 

const AnalyticsCard = ({ title, value, width, colorClass }) => {
  return (
    <div className="card5">
      <div className="card5-head">
        <h2>{title}</h2>
        <span>{value}</span>
      </div>
      <div className="card5-progress">
        <div className="card5-indicator">
          <div className={`indicator ${colorClass}`} style={{ width }}></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
