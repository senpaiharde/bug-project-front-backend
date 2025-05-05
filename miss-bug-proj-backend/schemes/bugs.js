import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const bugSchema = new Schema(
  {
    _id: {
         type: String,
         default: () => new mongoose.Types.ObjectId().toHexString(),
       },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    severity: { type: Number },

    ownerId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Bug = model('bug', bugSchema);
