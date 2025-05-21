import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";

const baseURL = process.env.REACT_APP_API_BASE_URL;
export const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [analytics, setAnalytics] = useState({
      productCount: 0,
      caseCount: 0,
      qualificationCount: 0,
      supportRequestCount: 0, // assuming you'll add this to backend later or leave 0
    });

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/api/contacts`);
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
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
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/contacts/deleteContact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      alert("Message deleted successfully");
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete message");
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
          {/* Analytics Cards */}
                   
            <div className="page-content">
                      <div className="analytics">
                        <AnalyticsCard title="Product List" value={analytics.productCount} width="60%" colorClass="one" />
                        <AnalyticsCard title="Case" value={analytics.caseCount} width="80%" colorClass="two" />
                        <AnalyticsCard title="Qualification" value={analytics.qualificationCount} width="75%" colorClass="three" />
                        <AnalyticsCard title="Support Requests" value={analytics.supportRequestCount} width="30%" colorClass="four" />
                      </div>
                    </div>
          

          <div className="user-table">
            <h2 style={{ marginTop: "2rem" }}>Message List Dashboard</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                     <th>Phone Number</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.message}</td>
                      <td>
                        <button onClick={() => handleDelete(contact._id)}>
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

export default ContactList;
