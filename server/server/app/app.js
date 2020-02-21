import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import router from '../routes/authentication';

const app = express();

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') app.use(cors({ credentials: true }));
app.use(router);

export default app;
