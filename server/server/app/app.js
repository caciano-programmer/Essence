import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import routes from '../routes/routes';

const app = express();

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// TODO remove cors and serve react from public
if (process.env.NODE_ENV === 'development') app.use(cors({ credentials: true }));
app.use(routes);
app.use((err, req, res, next) => {
  res.status(500).send({Error: err.message});
});

export default app;
