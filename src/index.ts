import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware for parsing JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files with explicit root path
app.use(express.static(path.join(__dirname, '..')))

// In-memory storage for registrations
interface Registration {
  id: string
  name: string
  phone: string
  idCard: string
  exhibitionId: string
  exhibitionName: string
  createdAt: Date
}

const registrations: Registration[] = []

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
      createdAt: new Date()
    }

    // Store registration
    registrations.push(registration)

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
})

export default app
