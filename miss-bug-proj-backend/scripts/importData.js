import dotenv from 'dotenv';
import fs from 'fs';
import { connectDB } from '../services/db.service.js';
import { Bug } from '../schemes/bugs.js';
import { User } from '../schemes/user.js';
import { Msg }  from '../schemes/msg.js'
dotenv.config();

async function importData() {
  await connectDB();

  await Bug.collection.dropIndex('title_1')
  .catch(err => {
    if (err.codeName !== 'IndexNotFound') throw err;
  });

  const bugs = JSON.parse(fs.readFileSync('./data/bug.db.json','utf-8'));
  await Bug.deleteMany({});
  await Bug.insertMany(bugs);
  console.log('🪲 Imported bugs');

  const users = JSON.parse(fs.readFileSync('./data/user.db.json','utf-8'));
  await User.deleteMany({});
  await User.insertMany(users);
  console.log('👤 Imported users');

  process.exit(0);
}

importData().catch(err => {
  console.error(err);
  process.exit(1);
});
