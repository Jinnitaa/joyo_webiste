import React, { useState } from 'react';
import axios from 'axios';
import './product.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdDelete, MdAdd } from 'react-icons/md';
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosCloudUpload } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { TiMinus } from "react-icons/ti";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const ProductCreateForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    detail: '',
    category: '',
    image: null,
    features: [],
    function: [{ name: '', description: '' }]
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleFeatureChange = (index, key, value) => {
    const updated = [...product.features];
    updated[index][key] = value;
    setProduct({ ...product, features: updated });
  };

  const addFeature = () => {
    setProduct({
      ...product,
      features: [...product.features, { header: '', points: [''] }]
    });
  };

  const removeFeature = (index) => {
    const updated = product.features.filter((_, i) => i !== index);
    setProduct({ ...product, features: updated });
  };

  const addPoint = (featureIndex) => {
    const updated = [...product.features];
    updated[featureIndex].points.push('');
    setProduct({ ...product, features: updated });
  };

  const removePoint = (featureIndex, pointIndex) => {
    const updated = [...product.features];
    updated[featureIndex].points.splice(pointIndex, 1);
    setProduct({ ...product, features: updated });
  };

  const handlePointChange = (featureIndex, pointIndex, value) => {
    const updated = [...product.features];
    updated[featureIndex].points[pointIndex] = value;
    setProduct({ ...product, features: updated });
  };

  const handleFunctionChange = (index, key, value) => {
    const updated = [...product.function];
    updated[index][key] = value;
    setProduct({ ...product, function: updated });
  };

  const addFunction = () => {
    setProduct({
      ...product,
      function: [...product.function, { name: '', description: '' }]
    });
  };

  const removeFunction = (index) => {
    const updated = product.function.filter((_, i) => i !== index);
    setProduct({ ...product, function: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('detail', product.detail);
    formData.append('category', product.category);
    if (product.image) formData.append('image', product.image);

    // Only send features if non-empty
    const filteredFeatures = product.features.filter(
      f => f.header.trim() !== '' || f.points.some(p => p.trim() !== '')
    );
    if (filteredFeatures.length > 0) {
      formData.append('features', JSON.stringify(filteredFeatures));
    }

    const filteredFunctions = product.function.filter(
      f => f.name.trim() !== '' || f.description.trim() !== ''
    );
    formData.append('functions', JSON.stringify(filteredFunctions));

    try {
    await axios.post(`${baseURL}/api/products/createProduct`,formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product Created Successfully');
      navigate('/cms/productList');
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Error creating product. Please try again later.');
    }
  };

  return (
    <div className="product-form-container">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? '' : 'full'}`}>
        <header>
          <div className="header-content">
            <span className="menu-toggle-icon" onClick={toggleSidebar}>
              <RxHamburgerMenu />
            </span>
          </div>
        </header>

        <main>
          <div className="page-header">
            <h1>Create Product</h1>
            <small>Fill in the details to create a new product</small>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-left">
              <h4>Product Name:</h4>
              <input type="text" name="name" value={product.name} onChange={handleChange} required />

              <h4>Product Description:</h4>
              <textarea name="description" value={product.description} onChange={handleChange} />

              <h4>Product Detail:</h4>
              <textarea name="detail" value={product.detail} onChange={handleChange} />

              <h4>Category:</h4>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="category-select"
              >
                <option value="">Select Category</option>
                <option value="PV Module">PV Module</option>
                <option value="Battery">Battery</option>
                <option value="Energy Storage">Energy Storage</option>
              </select>

              <h4>Upload Image (optional):</h4>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  id="file-input"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <div
                  className="upload-icon-container"
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <IoIosCloudUpload style={{ color: '#28a745', fontSize: '36px' }} />
                  <p>Click to Upload Image</p>
                </div>
              </div>
            </div>

            <div className="form-right">
              <div className="features-header">
                <h4>Features (Optional):</h4>
                <RiAddCircleLine
                  className="add-feature-icon"
                  onClick={addFeature}
                  title="Add Feature"
                />
              </div>

              {product.features.length === 0 && (
                <p style={{ fontStyle: 'italic', color: '#666' }}>No features added yet.</p>
              )}

              {product.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="feature-container">
                  <div className="feature-header-with-icon">
                    <h5>Feature Header:</h5>
                    <TiMinus
                      className="delete-icon"
                      onClick={() => removeFeature(featureIndex)}
                      title="Remove Feature"
                    />
                  </div>

                  <input
                    type="text"
                    value={feature.header}
                    onChange={(e) => handleFeatureChange(featureIndex, 'header', e.target.value)}
                  />

                  <div className="points-header">
                    <h5>Feature Points:</h5>
                    <MdAdd
                      className="add-point-icon"
                      onClick={() => addPoint(featureIndex)}
                      title="Add Point"
                    />
                  </div>

                  {feature.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="point-row">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handlePointChange(featureIndex, pointIndex, e.target.value)}
                      />
                      {feature.points.length > 1 && (
                        <TiMinus
                          className="delete-icon"
                          onClick={() => removePoint(featureIndex, pointIndex)}
                          title="Delete Point"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <div className="features-header">
                <h4>Functions:</h4>
                <RiAddCircleLine
                  className="add-feature-icon"
                  onClick={addFunction}
                  title="Add Function"
                />
              </div>

              {product.function.map((func, index) => (
                <div key={index} className="function-container">
                  <div className="function-header-with-icon">
                    <h5>Function Name:</h5>
                    {product.function.length > 1 && (
                      <TiMinus
                        className="delete-icon"
                        onClick={() => removeFunction(index)}
                        title="Remove Function"
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    value={func.name}
                    onChange={(e) => handleFunctionChange(index, 'name', e.target.value)}
                  />

                  <h5>Function Description:</h5>
                  <textarea
                    value={func.description}
                    onChange={(e) => handleFunctionChange(index, 'description', e.target.value)}
                  />
                </div>
              ))}

              <div className="form-submit">
                <button type="submit" className="submit-button">Create Product</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ProductCreateForm;
