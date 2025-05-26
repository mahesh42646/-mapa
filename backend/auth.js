const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5003;

const uri = 'mongodb+srv://darkunderishi1:kuENuFePAV3G3Mm0@cluster0.ubzgbpq.mongodb.net/apply?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Mongoose Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  mobile: String,
  profilePhoto: String,
  role: String,
  profileActive: { type: Boolean, default: true },
  profileApproval: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
  joiningDate: { type: Date, default: Date.now },
  lastSeen: Date
});

const User = mongoose.model('MapaUser', userSchema);

// Add User (POST)
app.post('/user', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { email, password, name, mobile, role } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    let photoPath = '';
    if (req.file) {
      const filename = `${Date.now()}_${email}.jpg`;
      const filePath = path.join(uploadDir, filename);
      await sharp(req.file.buffer).resize(300).jpeg({ quality: 80 }).toFile(filePath);
      photoPath = `/uploads/${filename}`;
    }

    const user = new User({
      email,
      password,
      name,
      mobile,
      role,
      profilePhoto: photoPath,
      lastSeen: new Date()
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User by Email (GET)
app.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User by Email (PUT)
app.put('/user/:email', upload.single('profilePhoto'), async (req, res) => {
  try {
    const updates = req.body;
    const email = req.params.email;

    if (req.file) {
      const filename = `${Date.now()}_${email}.jpg`;
      const filePath = path.join(uploadDir, filename);
      await sharp(req.file.buffer).resize(300).jpeg({ quality: 80 }).toFile(filePath);
      updates.profilePhoto = `/uploads/${filename}`;
    }

    updates.lastSeen = new Date();

    const user = await User.findOneAndUpdate({ email }, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete User by Email (DELETE)
app.delete('/user/:email', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ email: req.params.email });
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.json({ email: user.email, role: user.role, name: user.name });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Start server
app.listen(port, () => {
  console.log(`Auth server running at http://localhost:${port}`);
});
