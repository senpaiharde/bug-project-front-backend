import bcrypt from 'bcrypt';
import { User } from '../schemes/user.js';

export const userService = {
  async query() {
    // Return all users without passwords
    return User.find().select('-passwordHash').lean();
  },

  async getById(id) {
    return User.findById(id).select('-passwordHash').lean();
  },

  async add(userData) {
    // Hash password and create new user
    const { password, ...rest } = userData;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...rest, passwordHash });
    const obj = newUser.toObject();
    delete obj.passwordHash;
    return obj;
  },

  async update(id, userData) {
    const { password, ...rest } = userData;
    if (password) {
      rest.passwordHash = await bcrypt.hash(password, 10);
    }
    const updated = await User.findByIdAndUpdate(id, rest, { new: true })
      .select('-passwordHash')
      .lean();
    return updated;
  },

  async remove(id) {
    await User.findByIdAndDelete(id);
    return id;
  }
};
