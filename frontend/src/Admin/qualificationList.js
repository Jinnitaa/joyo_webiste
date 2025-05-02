import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";

const QualificationList = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/qualifications");
        setQualifications(response.data);
      } catch (error) {
        console.error("Error fetching qualifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQualifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/qualifications/${id}`);
      setQualifications((prev) => prev.filter((q) => q._id !== id));
      alert("Qualification deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete qualification");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="user-table">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "" : "full"}`}>
        <header>
          <div className="header-content">
            <span className="menu-toggle-icon" onClick={toggleSidebar}>
              <RxHamburgerMenu />
            </span>
          </div>
        </header>

        <main>
          <div className="page-header">
            <h1>Qualifications Overview</h1>
            <small>Image list and actions</small>
          </div>

          <div className="analytics">
            <AnalyticsCard title="Product List" value="20" width="60%" colorClass="one" />
            <AnalyticsCard title="Case" value="150" width="80%" colorClass="two" />
            <AnalyticsCard title="Qualifications" value={qualifications.length.toString()} width="75%" colorClass="three" />
            <AnalyticsCard title="Support Requests" value="5" width="30%" colorClass="four" />
          </div>

          <div className="user-table">
            <h2>Qualification List</h2>
            <Link to="/cms/qualificationCreate">
              <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 12px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px" }}>
                <MdCreateNewFolder size={20} />
                Create Qualification
              </button>
            </Link>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifications.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.image && (
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt="qualification"
                            width="80"
                            height="80"
                          />
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item._id)}>
                          <RiDeleteBin6Fill size={20} style={{ color: "#f25656" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QualificationList;
