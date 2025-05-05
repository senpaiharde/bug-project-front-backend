import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../schemes/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'missBugSecretKey';
const ADMIN_EMAIL = 'xxslavan11@gmail.com';
const SALT_ROUNDS = 10;

export async function signup(req, res) {
  try {
    const { email, password, fullname } = req.body;
    const existing = await User.findById({ email }).lean();
    if (existing) return res.status(409).send({ err: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ email, passwordHash, fullname, role: 'user' });

    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token, _id: user._id, fullname, role: user.role });
  } catch (err) {
    console.error(err, 'failed to signup');
    res.status(500).JSON({ err: 'failed to signup' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) return res.status(401).send('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).send('wrong password');

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token, _id: user._id, fullname, role: user.role });
  } catch (err) {
    console.error(err, 'failed to login');
    res.status(500).json({ err: 'failed to login' });
  }
}
