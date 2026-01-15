const express = require('express');
const path = require('path');

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for registrations
const registrations = [];

// User registration endpoint
app.post('/api/register', (req, res) => {
  try {
    const { name, phone, idCard, exhibitionId, exhibitionName } = req.body;

    // Validate required fields
    if (!name || !phone || !idCard || !exhibitionId || !exhibitionName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate phone number
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }

    // Validate ID card
    const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
    if (!idCardRegex.test(idCard)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID card format'
      });
    }

    // Create registration object
    const registration = {
      id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
      name,
      phone,
      idCard,
      exhibitionId,
      exhibitionName,
      createdAt: new Date().toISOString()
    };

    // Store registration in memory
    registrations.push(registration);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: registration.id,
        name: registration.name,
        exhibitionName: registration.exhibitionName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all registrations (for admin use)
app.get('/api/registrations', (req, res) => {
  try {
    res.json({
      success: true,
      data: registrations.map(reg => ({
        id: reg.id,
        name: reg.name,
        phone: reg.phone,
        exhibitionName: reg.exhibitionName,
        createdAt: reg.createdAt
      }))
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;