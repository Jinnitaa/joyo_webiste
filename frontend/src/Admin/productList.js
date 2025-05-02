import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AnalyticsCard from "./AnalyticsCard";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { MdCreateNewFolder } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// ProductList Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/cms/productUpdate/${id}`);
  };

  const handleProductDelete = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/products/deleteProduct/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      alert('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      alert('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="user-table">
      <h2>Product Information</h2>
      <Link to="/cms/productCreate">
          <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 12px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px" }}>
            <MdCreateNewFolder size={20} />
            Create Product
          </button>
        </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>{category}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Detail</th>
                  <th>Image</th>
                  <th>Feature</th>
                  <th>Function</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.detail}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>
                      {/* Safely render features */}
                      {(product.features || []).map((feature, index) => (
                        <div key={index}>
                          <strong>{feature.header}</strong>
                          <ul style={{ paddingLeft: "20px" }}>
                            {(feature.points || []).map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </td>
                    <td>
                      {/* Safely render functions */}
                      {(product.function || []).map((func, index) => (
                        <div key={index}>
                          <strong>{func.name}</strong>
                          <ul style={{ paddingLeft: "20px" }}>
                            {Array.isArray(func.description) ? (
                              func.description.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))
                            ) : (
                              <li>{func.description}</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(product._id)}>
                        <IoCreate size={20} style={{ color: "#11a8c3" }} />
                      </button>
                      <button onClick={() => handleProductDelete(product._id)}>
                        <RiDeleteBin6Fill size={20} style={{ color: "#f25656" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="dashboard-page">
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
            <small>Quick action and Latest Insight</small>
          </div>

          <div className="page-content">
            <div className="analytics">
              <AnalyticsCard
                title="Product List"
                value="20"
                width="60%"
                colorClass="one"
              />
              <AnalyticsCard
                title="Case"
                value="150"
                width="80%"
                colorClass="two"
              />
              <AnalyticsCard
                title="Qualification"
                value="20"
                width="75%"
                colorClass="three"
              />
              <AnalyticsCard
                title="Support Requests"
                value="5"
                width="30%"
                colorClass="four"
              />
            </div>
          </div>

          {/* Product List */}
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
