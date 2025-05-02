import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";

export const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleEdit = (id) => navigate(`/cms/faqUpdate/${id}`);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/faqs/deleteFAQ/${id}`);
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
            <h1>FAQ Dashboard</h1>
            <small>Manage Frequently Asked Questions</small>
          </div>

          {/* Analytics Cards */}
          <div className="page-content">
            <div className="analytics">
              <AnalyticsCard
                title="Total FAQs"
                value={faqs.length.toString()}
                width="80%"
                colorClass="one"
              />
              <AnalyticsCard
                title="Published"
                value={faqs.length.toString()} // Adjust if you implement status
                width="75%"
                colorClass="two"
              />
              <AnalyticsCard
                title="Drafts"
                value="0" // Adjust if you implement status
                width="30%"
                colorClass="three"
              />
              <AnalyticsCard
                title="Edits This Week"
                value="3" // Static for now, can be dynamic
                width="50%"
                colorClass="four"
              />
            </div>
          </div>

    

          {/* FAQ Table */}
          <div className="user-table">
          <h2 style={{ marginTop: "2rem" }}>FAQ List</h2>
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
