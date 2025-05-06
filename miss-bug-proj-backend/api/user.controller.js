import bcrypt from 'bcrypt';
import { User } from '../schemes/user.js';

const SALT_ROUNDS = 10;

export async function getUsers(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Access denied' });
    }
    const users = await User.find().select('-passwordHash').lean();
    return res.json(users);
  } catch (err) {
    console.error('getUsers failed', err);
    return res.status(500).json({ err: 'Failed to get users' });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ err: 'Authentication required' });
    }
    if (req.user.role !== 'admin' && req.user._id !== id) {
      return res.status(403).json({ err: 'Access denied' });
    }
    const user = await User.findById(id).select('-passwordHash').lean();
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error('getUserById failed', err);
    return res.status(500).json({ err: 'Failed to get user' });
  }
}

export async function saveUser(req, res) {
  try {
    const data = { ...req.body };
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ err: 'Authentication required' });
    }
    // CREATE
    if (!data._id) {
      if (currentUser.role !== 'admin') {
        return res.status(403).json({ err: 'Only admin can create users' });
      }
      const { email, fullname, password, role } = data;
      if (!email || !fullname || !password) {
        return res.status(400).json({ err: 'Email, fullname and password are required' });
      }
      const existing = await User.findOne({ email }).lean();
      if (existing) {
        return res.status(409).json({ err: 'Email already in use' });
      }
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await User.create({ email, fullname, passwordHash, role: role || 'user' });
      const result = newUser.toObject();
      delete result.passwordHash;
      return res.status(201).json(result);
    }
    // UPDATE
    const { _id, email, fullname, password, role } = data;
    const existing = await User.findById(_id);
    if (!existing) {
      return res.status(404).json({ err: 'User not found' });
    }
    if (currentUser.role !== 'admin' && currentUser._id !== _id) {
      return res.status(403).json({ err: 'Not your profile' });
    }
    if (email) existing.email = email;
    if (fullname) existing.fullname = fullname;
    if (password) existing.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // Only admin can update role
    if (role && currentUser.role === 'admin') {
      existing.role = role;
    }
    await existing.save();
    const result = existing.toObject();
    delete result.passwordHash;
    return res.json(result);
  } catch (err) {
    console.error('saveUser failed', err);
    return res.status(500).json({ err: 'Failed to save user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Access denied' });
    }
    const existing = await User.findById(id);
    if (!existing) {
      return res.status(404).json({ err: 'User not found' });
    }
    await User.deleteOne({ _id: id });
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error('deleteUser failed', err);
    return res.status(500).json({ err: 'Failed to delete user' });
  }
}
