import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router';

const app = express();
dotenv.config();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);  
const DB_URL = process.env.MONGO_URI

mongoose.Promise = Promise;
mongoose.connect(DB_URL,{
    dbName: 'shop'
});
mongoose.connection.on('error',(error: Error) => console.log(error));

app.use('/',router());

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

server.listen(process.env.PORT || '8000', () => {
    console.log('Server is running')
})
