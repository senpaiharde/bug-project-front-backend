import request from 'supertest';    
import fs from 'fs/promises';
import path from "path";
import app from '../server.js';   

const DB = path.join(process.cwd(), 'data','bug.db.json');

describe('API / api/bug', () => {
    beforeEach(async ()  =>{

        await fs.writeFile(DB, '[]', 'utf-8');
    });


    it('GET /api/bug → 200 & empty array', async () => {
         const res = await request(app).get('/api/bug');
         expect(res.status).toBe(200);   
        expoct(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(0);
    });

    it('POST /api/bug → 201 & returns the new bug', async () => {
        const payload = {title: 'TEST', describe:'Details'};

        const res = await request(app)
        .post('/api/bug')        
        .send(payload)
        .set('Authorization', 'Bearer TEST_TOKEN');
        expect(res.status).toBe(201);
        expect(res.body).ToMatchObject(payload);
        expect(res.body).TOhaveProperty('_id')
    })
})