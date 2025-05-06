export const bugService = {
  async queryBugs(filter = {}) {
    return await Bug.find(filter).lean();
  },

  async getBugByIdService(id) {
    return await Bug.findById(id).lean();
  },

  async updateBugService(id, bugData) {
    return Bug.findByIdAndUpdate(id, bugData, { new: true }).lean();
  },

  async removeBugService(id) {
    await Bug.findByIdAndDelete(id);
    return id;
  },
  async addBugService(bugData) {
    const bug = new Bug(bugData);
    await bug.save();
    return bug.toObject();
  },
};
