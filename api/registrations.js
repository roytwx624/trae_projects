// Get all registrations endpoint
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // In-memory storage (in Vercel, this will be empty on each deployment)
      res.status(200).json({
        success: true,
        data: []
      });
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};
