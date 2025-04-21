import request from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import app from '../server.js';

process.env.BUG_DB_PATH = path.join(process.cwd(), 'data', 'bug.test.db.json');

describe('API / api/bug', () => {
  beforeEach(async () => {
    await fs.writeFile(process.env.BUG_DB_PATH, '[]', 'utf-8');
  });

  it('GET /api/bug → 200 & empty array', async () => {
    const res = await request(app).get('/api/bug');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('POST /api/bug → 201 & returns the new bug', async () => {
    const payload = { title: 'TEST', description: 'Details' };

    const res = await request(app).post('/api/bug').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(payload);
    expect(res.body).toHaveProperty('_id');
  });
});
