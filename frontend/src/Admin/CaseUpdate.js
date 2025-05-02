import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './case.css';
import Sidebar from './Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdDelete, MdAdd } from 'react-icons/md';
import { RiAddCircleLine } from "react-icons/ri";
import { IoIosCloudUpload } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';

const CaseUpdateForm = () => {
  const [caseData, setCaseData] = useState({
    location: '',
    companyName: '',
    installedCapacity: '',
    investmentAmount: '',
    annualGeneration: '',
    saveStandardCoal: '',
    reductionOfEmission: '',
    image: null,
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();  // Case ID from URL params

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

   // Fetch product data for editing
   useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cases/${id}`);
        setCaseData(response.data); 
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error fetching product data. Please try again later.');
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCaseData({ ...caseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('location', caseData.location);
    formData.append('companyName', caseData.companyName);
    formData.append('installedCapacity', caseData.installedCapacity);
    formData.append('investmentAmount', caseData.investmentAmount);
    formData.append('annualGeneration', caseData.annualGeneration);
    formData.append('saveStandardCoal', caseData.saveStandardCoal);
    formData.append('reductionOfEmission', caseData.reductionOfEmission);
    if (caseData.image) formData.append('image', caseData.image);

    try {
      await axios.put(`http://localhost:5000/api/caseUpdate/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Case Updated Successfully');
      navigate('/cms/caseList');
    } catch (error) {
      console.error('Error updating case:', error);
      alert(error.response?.data?.message || 'Error updating case. Please try again later.');
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
            <h1>Update Case</h1>
            <small>Modify the details to update the case</small>
          </div>

          <form onSubmit={handleSubmit} className="case-form">
            <div className="form-left">
              <h4>Location:</h4>
              <input type="text" name="location" value={caseData.location} onChange={handleChange} required />

              <h4>Company Name:</h4>
              <input type="text" name="companyName" value={caseData.companyName} onChange={handleChange} required />

              <h4>Installed Capacity:</h4>
              <input type="text" name="installedCapacity" value={caseData.installedCapacity} onChange={handleChange} required />

              <h4>Investment Amount:</h4>
              <input type="text" name="investmentAmount" value={caseData.investmentAmount} onChange={handleChange} required />

              <h4>Annual Generation:</h4>
              <input type="text" name="annualGeneration" value={caseData.annualGeneration} onChange={handleChange} required />

              <h4>Save Standard Coal:</h4>
              <input type="text" name="saveStandardCoal" value={caseData.saveStandardCoal} onChange={handleChange} required />

              <h4>Reduction of Emission:</h4>
              <input type="text" name="reductionOfEmission" value={caseData.reductionOfEmission} onChange={handleChange} required />

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

            <div className="form-submit">
              <button type="submit" className="submit-button">Update Case</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CaseUpdateForm;
