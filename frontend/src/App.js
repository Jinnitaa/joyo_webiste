import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import ResponsiveNavbar from './Navbar';
import Carousel from './Slider';
import ProfileCards from './home1';
import Certificate from './certificate';
import Footer from './Footer';
import Vision from './Vision';
import Residence from "./residence";
import Commercial from "./Commercial";
import Household from "./Household";
import Dashboard from "./Admin/CMS";
import Industrial from "./Industrial";
import Micro from "./Solar-Micro";
import ProductForm from "./Admin/Productform";
import ProductList from "./Admin/productList";
import Sidebar from "./Admin/Sidebar";
import Inverter from "./Inverter";
import ProductUpdateForm from "./Admin/UpdateproductForm";
import ProductDetail from "./ProductDetail";
import CaseCreateForm from "./Admin/CaseCreateForm";
import { CaseList } from "./Admin/CaseList";
import CaseUpdateForm from "./Admin/CaseUpdate";
import FaqCreateForm from "./Admin/FaqCreate";
import FaqList from "./Admin/faqList";
import FaqUpdateForm from "./Admin/faqUpdate";
import QualificationCreateForm from "./Admin/QualificationCreate";
import QualificationList from "./Admin/qualificationList";
import Case from "./Case";
import CustomerFaq from "./Faq";
import Battery from "./Battery";
import PV from "./PV";
import ContactUs from "./Contact";
import ContactList from "./Admin/ContactList";
import AdminSignup from "./Admin/Signup";
import AdminLoginn from "./Admin/Login";
import ProtectedRoute from './Admin/ProtectedRoute';




// Define a Home component to avoid looping issue
function Home() {
  return (
    <>
      <Carousel />
      <ProfileCards />
      <Certificate />
      <Vision />
    </>
  );
}

// Layout component to conditionally render Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isCmsRoute = location.pathname.startsWith("/cms");

  return (
    <>
      {!isCmsRoute && <ResponsiveNavbar />}
      {children}
      {!isCmsRoute && <Footer />}
    </>
  );
}



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home Page */}
          <Route path="/residence" element={<Residence />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/household" element={<Household />} />
          <Route path="/industrial" element={<Industrial />} />
          <Route path="/solar-micro" element={<Micro />} />
          <Route path="/inverter" element={<Inverter />} />
          <Route path="/battery" element={<Battery/>} />
          <Route path="/pv-module" element={<PV/>} />
          <Route path="/case" element={<Case />} />
          <Route path="/faq" element={<CustomerFaq />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:id"  element={<ProductDetail />} />

          <Route path="/cms" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />  {/* CMS without Navbar/Footer */}
          <Route path="/cms/productCreate" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />  {/* CMS without Navbar/Footer */}
          <Route path="/cms/productList" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/cms/productUpdate/:id" element={<ProtectedRoute><ProductUpdateForm /></ProtectedRoute>} />
          <Route path="/cms/caseCreate" element={<ProtectedRoute><CaseCreateForm /></ProtectedRoute>} />  {/* CMS without Navbar/Footer */}
          <Route path="/cms/caseList" element={<ProtectedRoute><CaseList /></ProtectedRoute>} /> 
          <Route path="/cms/caseUpdate/:id" element={<ProtectedRoute><CaseUpdateForm /></ProtectedRoute>} /> 
          <Route path="/cms/faqCreate" element={<ProtectedRoute><FaqCreateForm /></ProtectedRoute>} /> 
          <Route path="/cms/faqList" element={<ProtectedRoute><FaqList /></ProtectedRoute>} /> 
          <Route path="/cms/faqUpdate/:id" element={<ProtectedRoute><FaqUpdateForm /></ProtectedRoute>} /> 
          <Route path="/cms/qualificationCreate" element={<ProtectedRoute><QualificationCreateForm /></ProtectedRoute>} />
          <Route path="/cms/qualificationList" element={<ProtectedRoute><QualificationList /></ProtectedRoute>} />
          <Route path="/cms/contactList" element={<ProtectedRoute><ContactList /></ProtectedRoute>} />
          
          
          
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/adminLogin" element={<AdminLoginn />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
