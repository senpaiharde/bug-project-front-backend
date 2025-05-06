import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const msgSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    txt: { type: String, required: true },
    aboutBugId: { type: String, required: true },
    byUserId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Msg = model('Msg', msgSchema);
