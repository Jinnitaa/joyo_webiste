import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AnalyticsCard from "./AnalyticsCard";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
const baseURL = process.env.REACT_APP_API_BASE_URL;
export const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [analytics, setAnalytics] = useState({
    productCount: 0,
    caseCount: 0,
    qualificationCount: 0,
    supportRequestCount: 0, // assuming you'll add this to backend later or leave 0
  });

  const navigate = useNavigate();

  // Fetch cases
  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
       const response = await axios.get(`${baseURL}/api/cases`);
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
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

  const handleEdit = (id) => navigate(`/cms/caseUpdate/${id}`);

  const handleCaseDelete = async (caseId) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/cases/deleteCase/${caseId}`);
      setCases((prevCases) => prevCases.filter((c) => c._id !== caseId));
      alert("Case deleted successfully");
    } catch (error) {
      console.error("Error deleting case:", error);
      alert("Failed to delete case");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="user-table">
      <Sidebar isSidebarOpen={isSidebarOpen} />

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

          <div className="case-section">
            <h2>Case Study Information</h2>
            <Link to="/cms/caseCreate">
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "10px",
                }}
              >
                <MdCreateNewFolder size={20} />
                Create Case
              </button>
            </Link>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Installed Capacity</th>
                      <th>Investment</th>
                      <th>Annual Generation</th>
                      <th>Save Coal</th>
                      <th>CO₂ Reduction</th>
                      <th>Location</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((caseItem) => (
                      <tr key={caseItem._id}>
                        <td>{caseItem.companyName}</td>
                        <td>{caseItem.installedCapacity}</td>
                        <td>{caseItem.investmentAmount}</td>
                        <td>{caseItem.annualGeneration}</td>
                        <td>{caseItem.saveStandardCoal}</td>
                        <td>{caseItem.reductionOfEmission}</td>
                        <td>{caseItem.location}</td>
                        <td>
                          {caseItem.image && (
                            <img
                              src={`${baseURL}/uploads/${caseItem.image}`}
                              alt={caseItem.companyName}
                              width="50"
                              height="50"
                            />
                          )}
                        </td>
                        <td>
                          <button onClick={() => handleEdit(caseItem._id)}>
                            <IoCreate size={20} style={{ color: "#11a8c3" }} />
                          </button>
                          <button onClick={() => handleCaseDelete(caseItem._id)}>
                            <RiDeleteBin6Fill size={20} style={{ color: "#f25656" }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CaseList;
