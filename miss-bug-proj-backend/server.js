import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bugRoutes from './api/bug.routes.js';
import autoRoutes from './api/auto.routes.js';
import userRoutes from './api/user.routes.js';
import { logger } from './middlewares/logger.js';
import dotenv from 'dotenv';

import './services/db.service.js'; 

dotenv.config();
// …
console.log('Using JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
// Use environment port or default to 3030
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cookieParser());

// Allow credentials & adjust origins as needed
const FRONTENDS = ['http://localhost:8080', 'http://localhost:5173'];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (FRONTENDS.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(logger);
// Health‑check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('hello there');
});
app.use('/api/auth', autoRoutes);

app.use('/api/user', userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`server ready at port ${PORT}yes`);
  });
}

app.use('/api/bug', bugRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ err: err.message || 'Server error' }); 
});

export default app;
