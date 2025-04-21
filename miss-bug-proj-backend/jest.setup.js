import path from 'path';

process.env.NODE_ENV = 'test';
process.env.BUG_DB_PATH = path.join(process.cwd(), 'data', 'bug.test.db.json');
