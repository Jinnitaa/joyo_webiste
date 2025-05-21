import React, { useState } from 'react';
import axios from 'axios';
import './case.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const baseURL = process.env.REACT_APP_API_BASE_URL;
const CaseCreateForm = () => {
  const [caseData, setCaseData] = useState({
    location: '',
    companyName: '',
    installedCapacity: '',
    investmentAmount: '',
    annualGeneration: '',
    saveStandardCoal: '',
    reductionOfEmission: '',
  });

  const [image, setImage] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(caseData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`${baseURL}/api/cases/createCase`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Case Created Successfully');
      navigate('/cms/caseList');
    } catch (error) {
      console.error('Error creating case:', error);
      alert(error.response?.data?.message || 'Error creating case. Please try again later.');
    }
  };

  return (
    <div className="case-form-container">
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
            <h1>Create Case</h1>
            <small>Fill in the details to create a new case</small>
          </div>

          <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
            <div className="form-left">
              <h4>Location:</h4>
              <input
                type="text"
                name="location"
                value={caseData.location}
                onChange={handleChange}
                required
              />

              <h4>Company Name:</h4>
              <input
                type="text"
                name="companyName"
                value={caseData.companyName}
                onChange={handleChange}
                required
              />

              <h4>Installed Capacity:</h4>
              <input
                type="text"
                name="installedCapacity"
                value={caseData.installedCapacity}
                onChange={handleChange}
                required
              />

              <h4>Investment Amount:</h4>
              <input
                type="text"
                name="investmentAmount"
                value={caseData.investmentAmount}
                onChange={handleChange}
              />
            </div>

            <div className="form-right">
              <h4>Annual Generation:</h4>
              <input
                type="text"
                name="annualGeneration"
                value={caseData.annualGeneration}
                onChange={handleChange}
              />

              <h4>Saved Standard Coal:</h4>
              <input
                type="text"
                name="saveStandardCoal"
                value={caseData.saveStandardCoal}
                onChange={handleChange}
              />

              <h4>Reduction of Emission:</h4>
              <input
                type="text"
                name="reductionOfEmission"
                value={caseData.reductionOfEmission}
                onChange={handleChange}
              />

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
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <IoIosCloudUpload style={{ color: '#28a745', fontSize: '36px' }} />
                  <p>Click to Upload Image</p>
                  {image && <p style={{ marginTop: '10px' }}><strong>Selected:</strong> {image.name}</p>}
                </div>
              </div>

              <div className="form-submit">
                <button type="submit" className="submit-button">Create Case</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CaseCreateForm;
