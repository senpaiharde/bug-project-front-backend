// services/bug.service.js
import { Bug } from '../schemes/bugs.js';

export const bugService = {
  // List bugs (optionally filter)
  async query(filter = {}) {
    return Bug.find(filter).lean();
  },
  // Get one by ID
  async getById(id) {
    return Bug.findById(id).lean();
  },
  // Create a new bug
  async add(data) {
    const bug = await Bug.create(data);
    return bug.toObject();
  },
  // Update existing bug
  async update(id, data) {
    return Bug.findByIdAndUpdate(id, data, { new: true }).lean();
  },
  // Delete by ID
  async remove(id) {
    await Bug.findByIdAndDelete(id);
    return id;
  }
};
