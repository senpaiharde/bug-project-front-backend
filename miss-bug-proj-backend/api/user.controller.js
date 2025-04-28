import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { query as queryBugs } from '../services/bug.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDbPath = path.join(__dirname, '../data/user.db.json');

export async function _loadUsers() {
  const text = await fs.readFile(userDbPath, 'utf-8');
  return JSON.parse(text);
}

export async function _saveUsers(user) {
  await fs.writeFile(userDbPath, JSON.stringify(user, null, 2));
}

export async function listUsers(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('only admin can can view user');
  const users = await _loadUsers();
  if (!Array.isArray(users)) users = [];
  res.json(users.map((u) => ({ _id: u._id, email: u.email, fullname: u.fullname, role: u.role })));
}

export async function getUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('Only admin can view a user');
  const users = await _loadUsers();
  const user = users.find((u) => u._id === req.params.id);
  if (!user) return res.status(404).send('user not found');
  res.json({ _id: user._id, email: user.email, fullname: user.fullname, role: user.role });
}

export async function updateUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('only  admin can update users');

  let users = await _loadUsers();
  if (!Array.isArray(users)) users = [];
  const idx = users.findIndex((u) => u._id === req.params.id);
  if (idx === -1) return res.status(404).send('User not found');

  users[idx] = { ...users[idx], ...req.body };
  await _saveUsers(users);
  const { _id, email, fullname, role } = users[idx];
  res.json({ _id, email, fullname, role });
}

export async function deleteUser(req, res) {
  if (req.user.role !== 'admin') return res.status(403).send('only admin can delete user');
  const allBugs = await queryBugs();
  if (allBugs.some((b) => b.ownerId === req.params.id))
    return res.status(400).send('can not delete user with existing bugs');

  const users = await _loadUsers();
  if (!Array.isArray(users)) users = [];
  const idx = users.findIndex((u) => u._id === req.params.id);
  if (idx === -1) return res.status(404).send('user not found');
  users.splice(idx, 1);
  await _saveUsers(users);
  res.send({ msg: 'user deleted' });
}
