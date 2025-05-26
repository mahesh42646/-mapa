const uri = 'mongodb+srv://darkunderishi1:kuENuFePAV3G3Mm0@cluster0.ubzgbpq.mongodb.net/apply?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5001;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const CulturalAgentSchema = new mongoose.Schema({
  cpf: String,
  name: String,
  birthDate: String,
  rg: String,
  socialName: String,
  gender: String,
  race: String,
  lgbt: String,
  education: String,
  income: String,
  mainArea: String,
  otherAreas: String,
  communities: String,
  disability: String,
  disabilityDetails: String,
  socialProgram: String,
  city: String,
  address: String,
  phone: String,
  responsible: String,
  email: String,
  password: String,
  agentType: [String],
  terms: Boolean,
  status: {
    type: String,
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CulturalAgent = mongoose.model("CulturalAgent", CulturalAgentSchema);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/cultural-agents", async (req, res) => {
  try {
    const newAgent = new CulturalAgent(req.body);
    await newAgent.save();
    res.status(200).json("Saved successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.get("/cultural-agents", async (req, res) => {
  const agents = await CulturalAgent.find();
  res.json(agents);
});

app.put("/cultural-agents/:id", async (req, res) => {
  const updated = await CulturalAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/cultural-agents/:id", async (req, res) => {
  await CulturalAgent.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
