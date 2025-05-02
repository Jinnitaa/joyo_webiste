import React, { useState } from 'react';
import axios from 'axios';
import './case.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const CaseCreateForm = () => {
  const [caseData, setCaseData] = useState({
    location: '',
    companyName: '',
    installedCapacity: '',
    investmentAmount: '',
    annualGeneration: '',
    saveStandardCoal: '',
    reductionOfEmission: '',
    image: null, // will store the image file
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Handle input changes
  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setCaseData({ ...caseData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data being sent for debugging
    console.log("Data being sent to backend:", caseData);

    const formData = new FormData();
    Object.keys(caseData).forEach((key) => {
      const value = caseData[key];
      if (key === 'image' && value === null) {
        formData.append(key, '');  // Append empty if no image
      } else {
        formData.append(key, value);
      }
    });

    // Log the FormData for debugging purposes
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

      try {
        await axios.post('http://localhost:5000/api/cases/createCase', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      // On success, navigate to the case list
      alert('Case Created Successfully');
      navigate('/cms/caseList');
    } catch (error) {
      // Handle any errors and display message
      console.error('Error creating case:', error.response?.data || error.message);
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

          <form onSubmit={handleSubmit} className="product-form">
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
                required
              />
            </div>

            <div className="form-right">
              <h4>Annual Generation:</h4>
              <input
                type="text"
                name="annualGeneration"
                value={caseData.annualGeneration}
                onChange={handleChange}
                required
              />

              <h4>Saved Standard Coal:</h4>
              <input
                type="text"
                name="saveStandardCoal"
                value={caseData.saveStandardCoal}
                onChange={handleChange}
                required
              />

              <h4>Reduction of Emission:</h4>
              <input
                type="text"
                name="reductionOfEmission"
                value={caseData.reductionOfEmission}
                onChange={handleChange}
                required
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
