// In-memory storage for registrations (shared with register.js)
import { registrations } from './register';

export default function handler(req, res) {
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
      res.status(200).json({
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
  } else {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}