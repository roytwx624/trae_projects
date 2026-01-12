import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Serve static files with explicit root path
app.use(express.static(path.join(__dirname, '..')))

// Explicit routes for our HTML files
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.get('/kejiaohui.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'kejiaohui.html'))
})

app.get('/booth-ideal.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'booth-ideal.html'))
})

app.get('/exhibition_platform.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'exhibition_platform.html'))
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

export default app
