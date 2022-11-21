import express from 'express';
import cors from 'cors';

/** Create router */
const router = express.Router();

/** Router middleware */
router.use(express.json());

/** Development middleware */
if (process.env.NODE_ENV === 'development') {
  router.use(cors());
}

router.post('/api/login', (request, response) => {
  if (!Object.hasOwn(request.body, 'email') && !Object.hasOwn(request.body, 'password'))
    throw new Error('Invalid login credentials');
  const { email, password } = request.body;
  console.log(`email: ${email}, password: ${password}`);
  response.end('Hi from api login');
});

router.post('/api/create', (request, response) => {
  const obj = { ...request.body };
  if (!Object.hasOwn(obj, 'email') && !Object.hasOwn(obj, 'password') && !Object.hasOwn(obj, 'name'))
    throw new Error('Invalid login credentials');
  const { name, email, password } = request.body;
  console.log(`name: ${name}, email: ${email}, password: ${password}`);
  response.end('Hi from api create');
});

export default router;
