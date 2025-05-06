import { Msg } from '../schemes/msg.js';

export const msgService = {
  async query(filter = {}) {
    return Msg.find(filter).lean();
  },

  async getById(id) {
    return Msg.findById(id).lean();
  },

  async add(msgData) {
    
    const msg = await Msg.create(msgData);
    return msg.toObject();
  },

  async update(id, msgData) {
    const updated = await Msg.findByIdAndUpdate(id, msgData, { new: true }).lean();
    return updated;
  },

  async remove(id) {
    await Msg.findByIdAndDelete(id);
    return id;
  }
};
