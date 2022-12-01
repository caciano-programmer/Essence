import express from 'express';
import router from './api/api.js';

/** Development Url Info */
const localhost = '127.0.0.1';
const dev_port = 4000;

/** Production Url Info */
const HOST = process.env.HOST || localhost;
const SERVER_PORT = Number(process.env.PORT) || dev_port;

/** Server Info */
const hostname = process.env.NODE_ENV === 'development' ? localhost : HOST;
const port = process.env.NODE_ENV === 'development' ? dev_port : SERVER_PORT;

/** Create Server */
const server = express();

/** Router */
server.use('/', router);

/** Listen for requests */
server.listen(port, hostname);
