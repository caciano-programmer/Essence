import express from 'express';
import cors from 'cors';
import { MissingCredentialError } from '../error/errorHandler.js';
import { createUser, login } from '../db/db.js';

/* Create router */
const router = express.Router();

/* Router middleware */
router.use(express.json());

/* Development middleware */
if (process.env.NODE_ENV === 'development') router.use(cors());

router.post('/api/login', (request, response, next) => {
  const { email, password } = request.body;
  if (typeof email === 'undefined' || typeof password === 'undefined') throw MissingCredentialError;
  login(email, password)
    .then(({ id, name, email }) => response.status(201).send({ id, name, email }).end())
    .catch(error => next(error));
});

router.post('/api/create', (request, response, next) => {
  const { name, email, password } = request.body;
  if (typeof name === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined')
    throw MissingCredentialError;
  createUser(name, email, password)
    .then(() => response.status(201).end())
    .catch(error => next(error));
});

export default router;
