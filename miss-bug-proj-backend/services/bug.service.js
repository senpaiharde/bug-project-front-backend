import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(' NODE_ENV =', process.env.NODE_ENV);
// Detect test environment\
const isTestEnv = process.env.NODE_ENV === 'test';
console.log(' isTestEnv =', isTestEnv);
// In-memory store for tests
let testBugs = [];

// Allow overriding the database path (e.g. for tests)
const DEFAULT_DB = path.join(__dirname, '..', 'data', 'bug.db.json');
const bugDbPath = process.env.BUG_DB_PATH || DEFAULT_DB;
console.log(' [bug.service] using DB path:', bugDbPath);

// Caching for production
let bugs = null;

async function _loadBugs() {
  if (isTestEnv) {
    return testBugs;
  }
  if (!bugs) {
    try {
      const data = await fs.readFile(bugDbPath, 'utf-8');
      bugs = JSON.parse(data);
    } catch {
      bugs = [];
      await fs.writeFile(bugDbPath, '[]', 'utf8');
      console.log('🔧 Initialized new bug.db.json');
    }
  }
  return bugs;
}

export async function query() {
  return _loadBugs();
}

export async function getById(bugId) {
  const all = await _loadBugs();
  return all.find((b) => b._id === bugId);
}

export async function remove(bugId) {
  const all = await _loadBugs();
  const idx = all.findIndex((b) => b._id === bugId);
  if (idx === -1) throw new Error('Bug not found');

  all.splice(idx, 1);
  await _saveBugs(all);
}

export async function save(bug) {
  const all = await _loadBugs();
  if (bug._id) {
    const idx = all.findIndex((b) => b._id === bug._id);
    if (idx === -1) throw new Error('Bug not found');
    all[idx] = bug;
  } else {
    bug._id = uuid();
    bug.createdAt = Date.now();
    all.push(bug);
  }
  await _saveBugs(all);
  return bug;
}

async function _saveBugs(all) {
  console.log(' [bug.service] saving', all.length, 'bugs to', bugDbPath);
  console.log('    payload:', JSON.stringify(all, null, 2));
  if (isTestEnv) {
    // Reset in-memory store for tests
    testBugs = [...all];
  } else {
    await fs.writeFile(bugDbPath, JSON.stringify(all, null, 2));
  }
  
}

// Helper to reset in-memory store in tests
export function __resetTestData() {
  testBugs = [];
}
