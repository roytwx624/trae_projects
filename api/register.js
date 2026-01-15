// User registration endpoint
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

  if (req.method === 'POST') {
    try {
      const { name, phone, idCard, exhibitionId, exhibitionName } = req.body;

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

      // In-memory storage (in Vercel, this will reset on each deployment)
      const registration = {
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
        name,
        phone,
        idCard,
        exhibitionId,
        exhibitionName,
        createdAt: new Date().toISOString()
      };

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
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};
