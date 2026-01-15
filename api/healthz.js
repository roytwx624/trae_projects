// Health check endpoint
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
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } else {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};
