import express from 'express';
import cors from 'cors';
import { createUser } from '../db/db.js';

/** Create router */
const router = express.Router();

/** Router middleware */
router.use(express.json());

/** Development middleware */
if (process.env.NODE_ENV === 'development') {
  router.use(cors());
}
/* TODO move database logic to dependency injection */
/* TODO create custom express error handler middleware */
router.post('/api/login', async (request, response) => {
  if (!Object.hasOwn(request.body, 'email') && !Object.hasOwn(request.body, 'password'))
    throw new Error('Invalid login credentials');
  const { email, password } = request.body;
  response.end();
});

router.post('/api/create', async (request, response) => {
  const obj = { ...request.body };
  if (!Object.hasOwn(obj, 'email') && !Object.hasOwn(obj, 'password') && !Object.hasOwn(obj, 'name'))
    throw new Error('Invalid login credentials');
  const { name, email, password } = request.body;
  const user = await createUser(name, email, password);
  response.status(200);
});

export default router;
