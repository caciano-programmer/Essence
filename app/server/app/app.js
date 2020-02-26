import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from '../routes/routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../../client/build/')));
app.use(routes);
app.use((err, req, res, next) => {
  res.status(500).send({ Error: err.message });
});

export default app;
