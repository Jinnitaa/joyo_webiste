import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inverter.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom'; 
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const Inverter = () => {
    useEffect(() => {
          AOS.init({ duration: 1000, once: true });
        }, []); 
  const sectionStyle = {
    backgroundImage: 'url("/images/bg14.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const response = await axios.get(`${baseUrl}/api/products`); 
        const inverterProducts = response.data.filter(product => product.category === 'Energy Storage');
        setProducts(inverterProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) return <div className="inverter-section">Loading...</div>;
  if (error) return <div className="inverter-section">{error}</div>;

  return (
    <>
      <div className="inverter-section" style={sectionStyle} >
        <div className="inverter-text" data-aos="flip-right">
          <h2>Energy Storage Inverter</h2>
          <p>
            A0FEI Energy Storage Inverter seamlessly integrates with various setups, 
            providing unparalleled compatibility. Notably, it also supports retrofit 
            installations, allowing for easy integration into existing systems. The 
            versatile inverters offer a comprehensive range of solutions, including 
            parallel operation, heat pump integration, microgrid connectivity, EV 
            charger compatibility, generator support, and VPP application.
          </p>
        </div>
      </div>

          <div className="grey-line"></div>

      {/* Products Section */}
      <div className="products-section" >
        <h2 className="products-title">Products</h2>
        <div className="products-line" />
        <div className="products-grid">
  {products.map((product, index) => (
    <Link 
      to={`/product/${product._id}`} 
      className="product-card" 
      data-aos="flip-up"
      key={product._id} 
      style={{ textDecoration: 'none', color: 'inherit' }} 
    >
      <img
        src={`${baseUrl}/uploads/${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
    </Link>
  ))}
</div>
      </div>
    </>
  );
};

export default Inverter;
