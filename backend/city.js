const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5004;
const uri = 'mongodb+srv://darkunderishi1:kuENuFePAV3G3Mm0@cluster0.ubzgbpq.mongodb.net/apply?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middlewares
const corsOptions = {
  origin: ['https://mapadacultura.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// City schema
const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  cnpj: { type: String, required: true },
  nameOfPersonInCharge: { type: String, required: true },
  whatsapp: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  cityStatus: { type: String, default: 'Ativo' },
  createdByEmail: String,
  createdByName: String,
  createdAt: { type: Date, default: Date.now },
});

const City = mongoose.model('City', citySchema);

// CREATE city
app.post('/city', upload.single('avatar'), async (req, res) => {
  try {
    // Optionally, if front-end sends createdBy info:
    const { 
      cityName, 
      cnpj, 
      nameOfPersonInCharge, 
      whatsapp, 
      city, 
      email, 
      password, 
      createdByEmail, 
      createdByName 
    } = req.body;

    let avatarPath = '';
    if (req.file) {
      const filename = Date.now() + '_city.jpg';
      const filePath = path.join(uploadDir, filename);

      // Resize & convert using sharp (400x400 as an example)
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .jpeg({ quality: 80 })
        .toFile(filePath);

      avatarPath = `/uploads/${filename}`;
    }

    const newCity = new City({
      cityName,
      cnpj,
      nameOfPersonInCharge,
      whatsapp,
      city,
      email,
      password,
      avatar: avatarPath,
      cityStatus: 'Ativo', // Set default value when creating
      createdByEmail,
      createdByName,
    });

    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all cities
app.get('/city', async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ single city by ID
app.get('/city/:id', async (req, res) => {
  try {
    const cityItem = await City.findById(req.params.id);
    if (!cityItem) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(cityItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE city
app.put('/city/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { 
      cityName, 
      cnpj, 
      nameOfPersonInCharge, 
      whatsapp, 
      city, 
      email, 
      password,
      cityStatus,  // Added cityStatus to capture it from request
      createdByEmail, 
      createdByName 
    } = req.body;

    const updates = { 
      cityName, 
      cnpj, 
      nameOfPersonInCharge, 
      whatsapp, 
      city, 
      email, 
      password,
      cityStatus,  // Added cityStatus to updates object
      createdByEmail, 
      createdByName 
    };

    if (req.file) {
      const filename = Date.now() + '_city.jpg';
      const filePath = path.join(uploadDir, filename);
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .jpeg({ quality: 80 })
        .toFile(filePath);
      updates.avatar = `/uploads/${filename}`;
    }

    const updatedCity = await City.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE city
app.delete('/city/:id', async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN city
app.post('/city/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const city = await City.findOne({ email });
    if (!city) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Simple password check (in production you would use bcrypt)
    if (city.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Return city data without password
    const cityData = {
      _id: city._id,
      cityName: city.cityName,
      email: city.email,
      nameOfPersonInCharge: city.nameOfPersonInCharge,
      avatar: city.avatar
    };
    
    res.json(cityData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`City API running on http://localhost:${port}`);
});
