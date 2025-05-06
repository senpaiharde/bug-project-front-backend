import { Query } from 'mongoose';
import { Msg } from '../schemes/msg.js';

export { Msg } from '../schemes/msg.js';


import { getBugsById, queryBugs } from './bug.controller.js';
import { getUserById, getUsers } from './user.controller.js';

export const MsgService = {
  async query(filter = {}) {
    return Msg.find(filter).lean();
  },
  async getById(id) {
    return Msg.findById(id).lean();
  },
  async add(msgData) {
    const msg = await Msg.create(msgData);
    return Msg.toObject();
  },
  async update(id, msgData) {
    return Msg.findByIdAndUpdate(id, msgData, { new: true }).lean();
  },
  async remove(id) {
    await Msg.findByIdAndDelete(id);
    return id;
  },
};

export async function getMsgs(req, res) {
  try {
    const bugs = await queryBugs();
    const msgs = await MsgService.query(req.query);
    const users = await getUsers();

    const bugById  = Object.fromEntries(bugs.map(b => [b._id, b]));
    const userById = Object.fromEntries(users.map(u => [u._id, u]));

    const enriched = msgs.map(m => ({
      _id: m._id,
      txt: m.txt,
      aboutBug: bugById[m.aboutBugId] ? {
        _id:      bugById[m.aboutBugId]._id,
        title:    bugById[m.aboutBugId].title,
        severity: bugById[m.aboutBugId].severity
      } : null,
      byUser: userById[m.byUserId] ? {
        _id:     userById[m.byUserId]._id,
        fullname:userById[m.byUserId].fullname
      } : null
    }));

    return res.json(enriched);
  } catch (err) {
    console.error('getMsgs failed', err);
    return res.status(500).json({ err: 'Failed to get messages' });
  }
}

export async function getMsgsById(req, res) {
  try {
    const {id} = req.params;
    const msg = await MsgService.getById(id);
    if (!msg) return res.status(404).json({ err: 'Message not found' });
      

      const [bug,user] = await Promise.all([
       getBugsById(msg.aboutBugId),
       getUserById(msg.byUserId)
      ]);

      return res.json({
        _id:      m._id,
        txt:      m.txt,
        aboutBug: bug ? { _id: bug._id, title: bug.title, severity: bug.severity } : null,
        byUser:   user ? { _id: user._id, fullname: user.fullname } : null
      });
    } catch (err) {
      console.error('getMsgById failed', err);
      return res.status(500).json({ err: 'Failed to get message' });
    }
  }
  

export async function saveMsg(req, res) {
  try {
    const data = {...req.body}
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ err: 'Authentication required' });
    if(data._id){
        data.byUserId = userId;
        const created = await MsgService.add(data)
        return res.status(201).json(created)
    }

    ///update
    const existing = await MsgService.getById(data._id)
    if(!existing) return res.status(404).json({ err: 'Message not found' });

    if(req.user.role !== 'admin' && existing.byUserId !== userId){
        return res.status(403).send({err: 'you are not the owner'})
    }
    const updated = await MsgService.update(data._id,data)
    return res.json(updated);
  } catch (err) {
    console.error(err, 'failed to save msg');
    return res.status(500).send({ err: 'failed to save msg' });
  }
}

export async function deleteMsg(req, res) {
  try {
    const {id} = req.params;
    const existing = await MsgService.getById(id)
    if(!existing) return res.status(404).json({ err: 'Message not found' });
    if(req.user.role !== 'admin' && existing.byUserId !== req.user._id){
        return res.status(403).send({err: 'you are not the owner'})
    }
    await MsgService.remove(id);
    return res.json({ msg: 'msg removed' });
  } catch (err) {
    console.error(err, 'failed to delete msg');
    return res.status(500).send({ err: 'failed to delete msg' });
  }
}
