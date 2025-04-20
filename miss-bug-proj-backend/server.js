import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bugRoutes from './api/bug.routes.js';
import autoRoutes from './api/auto.routes.js';
const app = express();

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
  })
);
// Health‑check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/bug', bugRoutes);

app.get('/', (req, res) => {
  res.send('hello there');
});
app.use('/api/auth', autoRoutes);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('server ready at port', PORT);
  });
}

export default app;
