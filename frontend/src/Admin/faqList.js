import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";
const baseURL = process.env.REACT_APP_API_BASE_URL;
export const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
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
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
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
  const handleEdit = (id) => navigate(`/cms/faqUpdate/${id}`);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/faqs/deleteFAQ/${id}`);
      setFaqs((prev) => prev.filter((faq) => faq._id !== id));
      alert("FAQ deleted successfully");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ");
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
          {/* Page Header */}

          <div className="page-header">
            <h1>Dashboard Overview</h1>
            <small>Quick action and Latest Insights</small>
          </div>

          {/* Analytics Cards */}
       <div className="page-content">
                      <div className="analytics">
                        <AnalyticsCard title="Product List" value={analytics.productCount} width="60%" colorClass="one" />
                        <AnalyticsCard title="Case" value={analytics.caseCount} width="80%" colorClass="two" />
                        <AnalyticsCard title="Qualification" value={analytics.qualificationCount} width="75%" colorClass="three" />
                        <AnalyticsCard title="Support Requests" value={analytics.supportRequestCount} width="30%" colorClass="four" />
                      </div>
                    </div>
          

    

          {/* FAQ Table */}
          <div className="user-table">
          <h2 style={{ marginTop: "2rem" }}>FAQ List Dashbaord</h2>
                {/* Create FAQ Button */}
                <Link to="/cms/faqCreate">
            <button
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "8px 12px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "1rem",
              }}
            >
              <MdCreateNewFolder size={20} />
              Create FAQ
            </button>
          </Link>
          <br></br>
          {loading ? (
            <p>Loading...</p>
          ) : (
            
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq._id}>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td>
                      <button onClick={() => handleEdit(faq._id)}>
                        <IoCreate size={20} style={{ color: "#11a8c3" }} />
                      </button>
                      <button onClick={() => handleDelete(faq._id)}>
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

export default FaqList;
