import request from 'supertest';
import { __resetTestData } from '../services/bug.service.js';
import app from '../server.js';

describe('API /api/bug', () => {
  beforeEach(() => {
    __resetTestData();
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
