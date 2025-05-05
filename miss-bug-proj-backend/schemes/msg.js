
import { Schema, model } from 'mongoose';

const msgSchema = new Schema({
  _id:        { type: String },
  txt:        { type: String, required: true },
  aboutBugId: { type: String, required: true },
  byUserId:   { type: String, required: true },
}, { timestamps: true });

export const Msg = model('Msg', msgSchema);
