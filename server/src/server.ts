import express from 'express';

/** Development Url Info */
const localhost = '127.0.0.1';
const dev_port = 3000;

/** Production Url Info */
const URL = 'UrlServerLocation';
const SERVER_PORT = 8080;

/** Server Info */
const hostname = process.env.NODE_ENV === 'development' ? localhost : URL;
const port = process.env.NODE_ENV === 'development' ? dev_port : SERVER_PORT;

/** Create Server */
const server = express();

/** Server Middleware */
server.use(express.json());

/** Listen for requests */
server.listen(port, hostname);
