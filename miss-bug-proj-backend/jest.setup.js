// jest.setup.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Force test environment before any tests run
process.env.NODE_ENV = 'test';
