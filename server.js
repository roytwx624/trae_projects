import app from './src/index.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API endpoints:`)
  console.log(`  POST /api/register - User registration`)
  console.log(`  GET /api/registrations - Get all registrations`)
})