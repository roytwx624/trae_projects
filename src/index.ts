import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware for parsing JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable CORS for all routes
app.use((req, res, next) => {
  // Log all requests for debugging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request received, sending 200 OK')
    res.sendStatus(200)
    return
  }
  
  next()
})

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')))

// In-memory storage for registrations (fallback for serverless environments like Vercel)
interface Registration {
  id: string
  name: string
  phone: string
  idCard: string
  exhibitionId: string
  exhibitionName: string
  createdAt: string
}

const registrations: Registration[] = []

// Initialize registrations array
function initRegistrations() {
  console.log('Registrations storage initialized')
}

// Get all registrations
function getAllRegistrations(): Registration[] {
  return registrations
}

// Save registration
function saveRegistration(registration: Registration): void {
  registrations.push(registration)
  console.log('Registration saved:', registration.id)
}

// Initialize storage
initRegistrations()

// ID card validation function
function validateIdCard(idCard: string): boolean {
  // Simple ID card validation (18 digits)
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  return idCardRegex.test(idCard)
}

// Phone number validation function
function validatePhone(phone: string): boolean {
  // Simple phone number validation (11 digits, starts with 1)
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

// Explicit routes for our HTML files
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.get('/kebohui.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'kebohui.html'))
})

app.get('/booth-ideal.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'booth-ideal.html'))
})

app.get('/exhibition_platform.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'exhibition_platform.html'))
})

app.get('/douyin-video.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'douyin-video.html'))
})

// Home route - redirect to index.html
app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// User registration endpoint
app.post('/api/register', (req, res) => {
  try {
    const { name, phone, idCard, exhibitionId, exhibitionName } = req.body

    // Validate required fields
    if (!name || !phone || !idCard || !exhibitionId || !exhibitionName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      })
    }

    // Validate ID card
    if (!validateIdCard(idCard)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID card format'
      })
    }

    // Create registration object
    const registration: Registration = {
      id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
      name,
      phone,
      idCard,
      exhibitionId,
      exhibitionName,
      createdAt: new Date().toISOString()
    }

    // Store registration in memory
    saveRegistration(registration)

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: registration.id,
        name: registration.name,
        exhibitionName: registration.exhibitionName
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Get all registrations (for admin use)
app.get('/api/registrations', (req, res) => {
  try {
    const registrations = getAllRegistrations()
    res.json({
      success: true,
      data: registrations.map(reg => ({
        id: reg.id,
        name: reg.name,
        phone: reg.phone,
        exhibitionName: reg.exhibitionName,
        createdAt: reg.createdAt
      }))
    })
  } catch (error) {
    console.error('Get registrations error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

export default app
