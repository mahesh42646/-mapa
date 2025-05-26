const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 6003;

const uri = 'mongodb+srv://darkunderishi1:kuENuFePAV3G3Mm0@cluster0.ubzgbpq.mongodb.net/apply?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

// User model - reuse the same model as in auth.js
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

// Login endpoint for Painal (city admins)
app.post('/painal-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check if the user is a city admin
    if (user.role !== 'cityAdmin') {
      return res.status(403).json({ error: 'Access denied. Only city administrators can log in to Painal.' });
    }
    
    // Update last seen timestamp
    user.lastSeen = new Date();
    await user.save();
    
    // Send back the required user info
    res.json({ email: user.email, role: user.role, name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get city admin profile
app.get('/painal-user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ 
      email: req.params.email,
      role: 'cityAdmin'
    });
    
    if (!user) {
      return res.status(404).json({ message: 'City admin not found' });
    }
    
    // Don't send sensitive information like password
    const userInfo = {
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      profilePhoto: user.profilePhoto,
      role: user.role,
      profileActive: user.profileActive,
      profileApproval: user.profileApproval,
      joiningDate: user.joiningDate,
      lastSeen: user.lastSeen
    };
    
    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Painal auth server running at http://localhost:${port}`);
}); 