import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import routes from '../routes/routes';

const app = express();
/* 
  TODO in future make sure when a new account is create in either basic or oauth, 
  it redirects to update profile page instead of home page
*/
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.get('/*', (req, res) => {
  res.redirect('/');
});
app.use((err, req, res, next) => {
  res.status(500).send({ Error: err.message });
});

export default app;
