import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './productDetail.css';
import { VscActivateBreakpoints } from "react-icons/vsc";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="center-text">Loading...</div>;
  if (error) return <div className="center-text error">{error}</div>;

  return (
    <div className="product-container">
      <div className="product-top">
        <img
          src={`${baseURL}/uploads/${product.image}`}
          alt={product.name}
          className="product-img"
        />
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-detail">{product.detail}</p>
        </div>
      </div>

      <div className="product-sections">
        {/* Feature Section */}
        {product.features?.some(f => Array.isArray(f.points) && f.points.length > 0) && (
          <div className="product-feature">
            <h2>Features</h2>
            {product.features.map((feature, i) => (
              Array.isArray(feature.points) && feature.points.length > 0 && (
                <div key={i} className="feature-block">
                  {feature.header && <h3>{feature.header}</h3>}
                  <ul>
                    {feature.points.map((point, j) => (
                      <li key={j} style={{fontSize:'14px',color: '#333'}}>
                        <VscActivateBreakpoints
                          style={{ marginRight: '8px', verticalAlign: 'middle', color: 'green' }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        )}

        {/* Function Section */}
        {Array.isArray(product.function) && product.function.length > 0 && (
          <div className="product-function">
            <h2>Functions</h2>
            <table>
              <thead>
                <tr>
                  <th>Function Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {product.function.map((func, index) => (
                  <tr key={index}>
                    <td>{func.name}</td>
                    <td>
                      {Array.isArray(func.description)
                        ? func.description.join(', ')
                        : func.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
