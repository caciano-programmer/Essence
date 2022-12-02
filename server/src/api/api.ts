import express from 'express';
import cors from 'cors';
import { createUser, login } from '../db/db.js';
import { HttpError } from '../error/errorHandler.js';

/* Create router */
const router = express.Router();

/* Router middleware */
router.use(express.json());

/* Development middleware */
if (process.env.NODE_ENV === 'development') router.use(cors());

/* TODO move database logic to dependency injection */
router.post('/api/login', (request, response, next) => {
  const { email, password } = request.body;
  if (typeof email === 'undefined' || typeof password === 'undefined') throw new HttpError('Missing credentials', 400);
  login(email, password)
    .then(() => response.status(201).end())
    .catch(error => next(error));
});

router.post('/api/create', (request, response, next) => {
  const { name, email, password } = request.body;
  if (typeof name === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined')
    throw new HttpError('Missing credentials', 400);
  createUser(name, email, password)
    .then(() => response.status(201).end())
    .catch(error => next(error));
});

export default router;
