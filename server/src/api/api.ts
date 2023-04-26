/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import cors from 'cors';
import { MissingCredentialError } from '../error/errorHandler.js';
import { createUser, login } from '../db/db.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const production = process.env.NODE_ENV === 'production';

/* Create router */
const router = express.Router();

/* Initialize redis client */
const redisClient = createClient();
redisClient.connect().catch(console.error);

/* Initialize redis store */
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'essence:',
});

/* Router middleware */
router.use(express.json());
router.use(
  session({
    store: redisStore,
    secret: production ? process.env.SESSION_SECRET_KEY! : 'secret',
    cookie: { secure: production, sameSite: production, maxAge: 28_800_000 },
    resave: false,
    saveUninitialized: false,
  }),
);

/* Development middleware */
if (!production) router.use(cors({ credentials: true }));

//TODO implement logout endpoint that deletes session as well
router.post('/api/login', (request, response, next) => {
  const { email, password } = request.body;
  if (typeof email === 'undefined' || typeof password === 'undefined') throw MissingCredentialError;
  console.log(request.session.id, request.session.cookie);
  login(email, password)
    .then(({ id, name, email }) => {
      request.session.USER = { name, email };
      response.status(201).send({ id, name, email }).end();
    })
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
