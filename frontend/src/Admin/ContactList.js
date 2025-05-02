import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import AnalyticsCard from "./AnalyticsCard";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/contacts");
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/contacts/deleteContact/${id}`);
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
            <h1>Contact Messages</h1>
            <small>View messages from users</small>
          </div>
          {/* Analytics Cards */}
                    <div className="page-content">
                      <div className="analytics">
                        <AnalyticsCard
                          title="Total FAQs"
                         
                          width="80%"
                          colorClass="one"
                        />
                        <AnalyticsCard
                          title="Published"
                         // Adjust if you implement status
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
          

          <div className="user-table">
            <h2 style={{ marginTop: "2rem" }}>Message List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
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
