// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import Product from './model/Product.js';
import Case from './model/Case.js';
import FAQ from './model/FAQ.js';
import Contact from './model/Contact.js';
import Qualification from './model/Qualification.js';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join('uploads'))); // Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/JOYO', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((error) => console.error('❌ MongoDB connection error:', error));

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ---------------- Routes ---------------- //

// CREATE Product
app.post('/api/products/createProduct', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, detail, features, functions } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !description || !category || !features || !functions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedFeatures, parsedFunctions;
    try {
      parsedFeatures = JSON.parse(features);
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
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({ fullName, email, message });
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


// ---------------- Start Server ---------------- //
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
