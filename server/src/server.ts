import express from 'express';
import router from './api/api.js';

/** Development Url Info */
const localhost = '127.0.0.1';
const dev_port = 4000;

/** Production Url Info */
const URL = 'UrlServerLocation';
const SERVER_PORT = 8080;

/** Server Info */
const hostname = process.env.NODE_ENV === 'development' ? localhost : URL;
const port = process.env.NODE_ENV === 'development' ? dev_port : SERVER_PORT;

/** Create Server */
const server = express();

/** Router */
server.use('/', router);

/** Listen for requests */
server.listen(port, hostname);
