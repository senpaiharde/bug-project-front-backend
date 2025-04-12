import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bugRoutes from './api/bug.routes.js';
import autoRoutes from './api/auto.routes.js'
const app = express()

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use('/api/bug', bugRoutes)

app.get('/',(req,res) => {
    res.send('hello there');
});

app.listen(3030,() => {
    console.log('server ready at port 3030')
});

app.use('/api/auth',autoRoutes)