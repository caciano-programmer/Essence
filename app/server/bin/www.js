import debugLib from 'debug';
import http from 'http';
import { initDB } from '../db/dbConfig';
import app from '../app/app';

/* eslint-disable no-restricted-globals, no-unreachable, no-console */

// initialize database
initDB();

const debug = debugLib('app:server');

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
  const transformedPort = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (transformedPort >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
