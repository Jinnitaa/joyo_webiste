import React, { useState } from 'react';
import axios from 'axios';
import './product.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const QualificationCreateForm = () => {
  const [image, setImage] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/qualifications/create', formData);
      alert('Qualification Created Successfully');
      navigate('/cms/qualificationList');
    } catch (error) {
      console.error('Error creating qualification:', error);
      alert(error.response?.data?.message || 'Error creating qualification. Please try again later.');
    }
  };

  return (
    <div className="faq-form-container">
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
            <h1>Create Qualification</h1>
            <small>Upload an image to create a new qualification</small>
          </div>

          <form onSubmit={handleSubmit} className="faq-form" encType="multipart/form-data">
            <div className="form-group">
              <h4>Upload Image (required):</h4>
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
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    border: '2px dashed #28a745',
                    padding: '20px',
                    borderRadius: '8px',
                  }}
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <IoIosCloudUpload style={{ color: '#28a745', fontSize: '36px' }} />
                  <p>Click to Upload Image</p>
                  {image && <p style={{ marginTop: '10px' }}><strong>Selected:</strong> {image.name}</p>}
                </div>
              </div>

              <div className="form-submit" style={{ marginTop: '20px' }}>
                <button type="submit" className="submit-button">Create Qualification</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default QualificationCreateForm;
