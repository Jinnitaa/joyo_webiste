import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inverter.css';
import { Link } from 'react-router-dom'; 

const Inverter = () => {
  const sectionStyle = {
    backgroundImage: 'url("/images/bg14.png")', // image must be in public/images folder
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
  const [loading, setLoading] = useState(true); // optional loader state
  const [error, setError] = useState(null); // optional error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // adjust your endpoint
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
      <div className="inverter-section" style={sectionStyle}>
        <div className="inverter-text">
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

      {/* Products Section */}
      <div className="products-section">
        <h2 className="products-title">Products</h2>
        <div className="products-line" />
        <div className="products-grid">
  {products.map((product, index) => (
    <Link 
      to={`/product/${product._id}`} 
      className="product-card" 
      key={product._id} 
      style={{ textDecoration: 'none', color: 'inherit' }} // Optional styling to keep it clean
    >
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
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
