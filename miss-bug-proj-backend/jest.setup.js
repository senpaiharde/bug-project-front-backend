// jest.setup.js
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Force test environment before any tests run
// jest.setup.js

process.env.NODE_ENV = 'test';
process.env.BUG_DB_PATH = path.join(process.cwd(), 'data', 'bug.test.db.json');
