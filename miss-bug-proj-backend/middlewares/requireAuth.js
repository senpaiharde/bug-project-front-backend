import jwt from 'jsonwebtoken';
import { User } from '../schemes/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'missBugSecretKey';

export async function requireAuth(req, res, next) {
  try{
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
  ? authHeader.slice(7)
  : null;
if (!token) return res.status(401).json({ err: 'Authentication required' });
        
  const payload = jwt.verify(token, JWT_SECRET)
  const user = await User.findById(payload._id).select('-passwordHash').lean()
  if(!user) res.status(401).json({err: 'user not found'})
    req.user =user;
next()
  }catch(err){
   console.error('Invalid or expired token',err);
   res.status(500).json({err: 'Invalid or expired token'})
}

}


export async function adminOnly(req,res,next) {
    if(!req.user || req.user.role !== 'admin'){
        return res.status(403).json({err: 'access denied'})
    }
    next()
    return;
}