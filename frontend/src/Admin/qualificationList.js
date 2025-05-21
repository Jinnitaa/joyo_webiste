import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";
const baseURL = process.env.REACT_APP_API_BASE_URL; 
const QualificationList = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
          productCount: 0,
          caseCount: 0,
          qualificationCount: 0,
          supportRequestCount: 0, // assuming you'll add this to backend later or leave 0
        });

  useEffect(() => {
    const fetchQualifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/qualifications`);
        setQualifications(response.data);
      } catch (error) {
        console.error("Error fetching qualifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQualifications();
  }, []);

  // Fetch analytics summary counts
    useEffect(() => {
      const fetchAnalytics = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/analytics`);
          setAnalytics({
            productCount: response.data.productCount || 0,
            caseCount: response.data.caseCount || 0,
            qualificationCount: response.data.qualificationCount || 0,
            supportRequestCount: response.data.supportRequestCount || 0,
          });
        } catch (error) {
          console.error("Error fetching analytics:", error);
        }
      };
      fetchAnalytics();
    }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/qualifications/${id}`);
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
            <h1>Dashboard Overview</h1>
            <small>Quick action and Latest Insights</small>
          </div>

          <div className="page-content">
                      <div className="analytics">
                        <AnalyticsCard title="Product List" value={analytics.productCount} width="60%" colorClass="one" />
                        <AnalyticsCard title="Case" value={analytics.caseCount} width="80%" colorClass="two" />
                        <AnalyticsCard title="Qualification" value={analytics.qualificationCount} width="75%" colorClass="three" />
                        <AnalyticsCard title="Support Requests" value={analytics.supportRequestCount} width="30%" colorClass="four" />
                      </div>
                    </div>

          <div className="user-table">
            <h2>Qualification List Dashbaord</h2>
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
                            src={`${baseURL}/uploads/${item.image}`}
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
