import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fullname: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);
export const User = model('user', userSchema);
