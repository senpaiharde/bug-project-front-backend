import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { query as queryBugs } from '../services/bug.service';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDbPath = path.join(__dirname, '../data/user.db.json');

async function _loadUsers() {
  const text = await fs.readFile(userDbPath, 'utf-8');
  return JSON.parse(text);
}

async function _saveUsers(user) {
  await fs.writeFile(userDbPath, JSON.stringify(user, null, 2));
}

async function getUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('Only admin can view a user');
  const users = await _loadUsers();
  const user = users.find((u) => u._id === req.params.id);
  if (!user) return res.status(404).send('user not found');
  res.json({ _id: user._id, email: user.email, fullname: user.fullname, role: user.role });
}

export async function updateuser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('only  admin can update users');

  const users = await _loadUsers();
  const idx = users.findIndex((u) => i._id === req.params.body);
  if (!idx) return res.status(404).send('user not found');

  users[idx] = { ...users[idx], ...req.body };
  res.json({
    _id: users[idx],
    email: users[idx].email,
    fullname: users[idx].fullname,
    role: users[idx].role,
  });
}


export async function deleteUser(req,res) {
    if(req.user.role !== 'admin')
        return res.status(403).send('only admin can delete user')
    const allBugs = await queryBugs()
    if (allBugs.some(b => b.ownerId === req.params.id))
        return res.status(400).send('can nott delete user with existing bugs');

    const users = await _loadUsers;
    const idx = users.findIndex(u => u._id === req.params.id)
    if(idx === -1) return res.status(404).send('user not found');
    users.slice(idx,1)
    await _saveUsers(users)
    res.send({msg: 'user deleted'})


}