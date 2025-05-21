import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AnalyticsCard from "./AnalyticsCard";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { MdCreateNewFolder } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    productCount: 0,
    caseCount: 0,
    qualificationCount: 0,
    supportRequestCount: 0,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
      const response = await axios.get(`${baseURL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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

  const handleEdit = (id) => {
    navigate(`/cms/productUpdate/${id}`);
  };

  const handleProductDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/products/deleteProduct/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

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

          {/* Product Table */}
          <div className="user-table">
            <h2 style={{ marginTop: "2rem" }}>Product List Dashboard</h2>

            <Link to="/cms/productCreate">
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
                Create Product
              </button>
            </Link>

            <br />
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
                              src={`${baseURL}/uploads/${product.image}`}
                              alt={product.name}
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>
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
        </main>
      </div>
    </div>
  );
};

export default ProductList;
