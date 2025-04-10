import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.get('/',(req,res) => {
    res.send('hello there');
});

app.listen(3030,() => {
    console.log('server ready at port 3030')
});