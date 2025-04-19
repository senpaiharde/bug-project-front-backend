import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDbPath = path.join(__dirname, '../data/user.db.json');

const JWT_SECRET = 'missBugSecretKey';
const ADMIN_EMAIL = 'xxslavan11@gmail.com';

export async function signup(req, res) {
  const { email, password, fullname } = req.body;
  
  if (!email || !password || !fullname) return res.status(400).send('Missing fields');
  
  const users = await _loadUsers();
  const exists = users.find((u) => u.email === email);

  if (exists) return res.status(400).send('user already exists');

  const hash = await bcrypt.hash(password, 10);



  const user = { _id: _makeId(),
     email,
      fullname,
       password: hash,
        role: email === ADMIN_EMAIL ? 'admin' : 'user' };
  users.push(user);
  await _saveUsers(users);

  const token = _createToken(user);
  res.send({ token, user: { _id: user._id, email, fullname, role: user.role } });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const users = await _loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).send('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).send('wrong password');

  const token = _createToken(user);
  res.send({ token, user: { _id: user._id,
     email,
      fullname: user.fullname,
     role:user.role
    } 
});
}

function _createToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

function _makeId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function _loadUsers() {
  try {
    const data = await fs.readFile(userDbPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function _saveUsers(users) {
  await fs.writeFile(userDbPath, JSON.stringify(users, null, 2));
}
