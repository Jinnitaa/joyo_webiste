// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import Product from './model/Product.js';
import Case from './model/Case.js';
import FAQ from './model/FAQ.js';
import Contact from './model/Contact.js';
import Admin from './model/Admin.js';
import Qualification from './model/Qualification.js';
import path from 'path';




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads'))); // Serve static files

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ---------------- Routes ---------------- //
app.get('/', (req, res) => {
  res.send('Hello World');
});

// CREATE Product
app.post('/api/products/createProduct', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, detail, features, functions } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !description || !category || !functions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedFeatures = [];
    let parsedFunctions;

    try {
      if (features) {
        parsedFeatures = JSON.parse(features);
      }
      parsedFunctions = JSON.parse(functions);
    } catch (error) {
      return res.status(400).json({ message: 'Error parsing features or functions' });
    }

    const newProduct = new Product({
      name,
      description,
      detail: detail || '',
      category,
      image,
      features: parsedFeatures,
      function: parsedFunctions,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});
// GET All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// UPDATE Product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, detail, features, functions } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !description || !category  || !features || !functions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedFeatures, parsedFunctions;
    try {
      parsedFeatures = JSON.parse(features);
      parsedFunctions = JSON.parse(functions);
    } catch (error) {
      return res.status(400).json({ message: 'Error parsing features or functions' });
    }

    const updatedData = {
      name,
      description,
      detail,
      category,
      features: parsedFeatures,
      function: parsedFunctions,
    };

    if (image) updatedData.image = image;

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE Product
app.delete('/api/products/deleteProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

////////////////////// Case //////////////////////////////////////////
app.post('/api/cases/createCase', upload.single('image'), async (req, res) => {
  try {
    // Log the incoming form data to verify that fields are present
    console.log('Form Data:', req.body);
    console.log('Uploaded Image:', req.file);

    const {
      location,
      companyName,
      installedCapacity,
      investmentAmount,
      annualGeneration,
      saveStandardCoal,
      reductionOfEmission
    
    
    } = req.body;


    const image = req.file ? req.file.filename : null;

    const newCase = new Case({
      location,
      companyName,
      installedCapacity,
      investmentAmount,
      annualGeneration,
      saveStandardCoal,
      reductionOfEmission,
      image
    });

    await newCase.save();
    res.status(201).json({ message: 'Case created successfully', case: newCase });
  } catch (error) {
    console.error('Error creating case:', error);
    res.status(500).json({ message: 'Error creating case', error: error.message });
  }
});

// GET All Cases
app.get('/api/cases', async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cases', error: error.message });
  }
});

// GET Case by ID
app.get('/api/cases/:id', async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ message: 'Case not found' });
    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case', error: error.message });
  }
});

// UPDATE Case
app.put('/api/caseUpdate/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      location,
      companyName,
      installedCapacity,
      investmentAmount,
      annualGeneration,
      saveStandardCoal,
      reductionOfEmission,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const updatedData = {
      location,
      companyName,
      installedCapacity,
      investmentAmount,
      annualGeneration,
      saveStandardCoal,
      reductionOfEmission,
    };

    if (image) updatedData.image = image;

    const updatedCase = await Case.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });

    res.json({ message: 'Case updated successfully', case: updatedCase });
  } catch (error) {
    console.error('Error updating case:', error);
    res.status(500).json({ message: 'Error updating case', error: error.message });
  }
});

// DELETE Case
app.delete('/api/cases/deleteCase/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid case ID' });
    }

    const result = await Case.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Error deleting case:', error);
    res.status(500).json({ message: 'Error deleting case', error: error.message });
  }
});

// ---------------- FAQ ---------------- //

// CREATE FAQ
app.post('/api/faqs/createFAQ', async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFAQ = new FAQ({ question, answer });
    await newFAQ.save();

    res.status(201).json({ message: 'FAQ created successfully', faq: newFAQ });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Error creating FAQ', error: error.message });
  }
});

// GET All FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
  }
});

// GET FAQ by ID
app.get('/api/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching FAQ', error: error.message });
  }
});

// UPDATE FAQ
app.put('/api/faqs/:id', async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );

    if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });

    res.json({ message: 'FAQ updated successfully', faq: updatedFAQ });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Error updating FAQ', error: error.message });
  }
});

// DELETE FAQ
app.delete('/api/faqs/deleteFAQ/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid FAQ ID' });
    }

    const result = await FAQ.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
  }
});

// ---------------- Qualification ---------------- //

// CREATE Qualification
app.post('/api/qualifications/create', upload.single('image'), async (req, res) => {
  try {
    const image = req.file?.filename;
    if (!image) return res.status(400).json({ message: 'Image is required' });

    const newQualification = new Qualification({ image });
    await newQualification.save();

    res.status(201).json({ message: 'Qualification created', qualification: newQualification });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all Qualifications
app.get('/api/qualifications', async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// GET Qualification by ID
app.get('/api/qualifications/:id', async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ message: 'Not found' });
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err.message });
  }
});

// UPDATE Qualification
app.put('/api/qualifications/:id', upload.single('image'), async (req, res) => {
  try {
    const image = req.file?.filename;
    if (!image) return res.status(400).json({ message: 'Image is required to update' });

    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      { image },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Updated successfully', qualification: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating data', error: err.message });
  }
});

// DELETE Qualification
app.delete('/api/qualifications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await Qualification.deleteOne({ _id: id });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting data', error: err.message });
  }
});

// ---------------- Contact ---------------- //
app.post('/api/contacts/createContact', async (req, res) => {
  try {
    const { fullName, email,phone, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({ fullName, email, message, phone });
    await newContact.save();

    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

app.delete('/api/contacts/deleteContact/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Contact ID' });
    }

    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

// ---------------- Admin Signup and Login  ---------------- //

app.post('/admin/signup', async (req, res) => {
  const { username, password, signupKey } = req.body;

  if (signupKey !== process.env.ADMIN_CREATION_SECRET) {
    return res.status(403).json({ message: 'Invalid signup key' });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/analytics', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const caseCount = await Case.countDocuments();
    const faqCount = await FAQ.countDocuments();
    const qualificationCount = await Qualification.countDocuments();
    const supportRequestCount = await Contact.countDocuments();

    res.json({
      productCount,
      caseCount,
      faqCount,
      qualificationCount,
      supportRequestCount,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});



// ---------------- Start Server ---------------- //
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
