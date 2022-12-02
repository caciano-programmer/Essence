import express from 'express';
import router from './api/api.js';
import { errorHandler } from './error/errorHandler.js';

/* Development Url Info */
const localhost = '127.0.0.1';
const dev_port = 4000;

/* Production Url Info */
const HOST = process.env.HOST || localhost;
const SERVER_PORT = Number(process.env.PORT) || dev_port;

/* Server Info */
const hostname = process.env.NODE_ENV === 'development' ? localhost : HOST;
const port = process.env.NODE_ENV === 'development' ? dev_port : SERVER_PORT;

/* Create Server */
const server = express();
server.disable('x-powered-by');

/* Router */
server.use('/', router);

/* custom error handler, should be last middleware declared */
server.use(errorHandler);

/* Listen for requests */
server.listen(port, hostname);
