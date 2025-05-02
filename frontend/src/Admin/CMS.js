import React, { useState } from 'react';
import axios from 'axios';
import './product.css';
import Sidebar from './Sidebar'; // Import Sidebar component
import { RxHamburgerMenu } from 'react-icons/rx'; // Import hamburger icon

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    image: null,
    features: [{ header: '', points: [''] }] // Features with only header and points
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen); // Toggle sidebar function

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[index][key] = value;  
    setProduct({ ...product, features: updatedFeatures });
  };

  const addFeature = () => {
    setProduct({
      ...product,
      features: [...product.features, { header: '', points: [''] }]
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = product.features.filter((_, i) => i !== index);
    setProduct({ ...product, features: updatedFeatures });
  };

  const addPoint = (featureIndex) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[featureIndex].points.push('');
    setProduct({ ...product, features: updatedFeatures });
  };

  const handlePointChange = (featureIndex, pointIndex, value) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[featureIndex].points[pointIndex] = value;
    setProduct({ ...product, features: updatedFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('image', product.image);
    formData.append('features', JSON.stringify(product.features)); // Send features as a JSON string

    try {
      const response = await axios.post('http://localhost:5000/api/products/createProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product Created Successfully');
      setProduct({
        name: '',
        description: '',
        category: '',
        image: null,
        features: [{ header: '', points: [''] }] // Reset features
      });

    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Error creating product. Please try again later.');
    }
  };

  return (
    <div className="product-form-container">
      <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Sidebar component */}
      <div className={`main-content ${isSidebarOpen ? "" : "full"}`}>
        <header>
          <div className="header-content">
            <span className="menu-toggle-icon" onClick={toggleSidebar}>
              <RxHamburgerMenu /> {/* Hamburger icon */}
            </span>
          </div>
        </header>

        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <h4>Product Name:</h4>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />

          <h4>Product Description:</h4>
          <textarea name="description" value={product.description} onChange={handleChange} required />

          <h4>Category:</h4>
          <select name="category" className="long-select" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="PV Module">PV Module</option>
            <option value="Battery">Battery</option>
            <option value="Energy Storage">Energy Storage</option>
          </select>

          <h4>Upload Image:</h4>
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          <h4>Features</h4>
          {product.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="feature-container">
              <h5>Feature Header:</h5>
              <input
                type="text"
                value={feature.header}
                onChange={(e) => handleFeatureChange(featureIndex, 'header', e.target.value)}
                required
              />

              <h6>Feature Points:</h6>
              {feature.points.map((point, pointIndex) => (
                <div key={pointIndex}>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handlePointChange(featureIndex, pointIndex, e.target.value)}
                    required
                  />
                </div>
              ))}

              <button type="button" className="add-button" onClick={() => addPoint(featureIndex)}>
                + Add Point
              </button>

              {product.features.length > 1 && (
                <button type="button" className="remove-button" onClick={() => removeFeature(featureIndex)}>
                  Remove Feature
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-button" onClick={addFeature}>+ Add Feature</button>

          <button type="submit" className="submit-button">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
