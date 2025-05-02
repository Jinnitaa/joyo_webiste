import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './inverter.css';
import { Link } from 'react-router-dom'; 

const PV = () => {
  const sectionStyle = {
    backgroundImage: 'url("/images/bb2.png")', // Make sure the image is in public/images
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '60vh',
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
        const response = await axios.get('http://localhost:5000/api/products');
        const pvProducts = response.data.filter(product => product.category === 'PV Module');
        setProducts(pvProducts);
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
      {/* Top Banner Section */}
      <div className="inverter-section" style={sectionStyle}>
        <h1 style={{ color: 'white', fontSize: '30px' }}>PV Module</h1>
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2 className="products-title">Products</h2>
        <div className="products-line" />
        
        <div className="products-grid">
          {products.map(product => (
            <Link 
              to={`/product/${product._id}`} 
              className="product-card" 
              key={product._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>l
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PV;
