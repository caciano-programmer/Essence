import express from 'express';
import { login } from './api/login';
import { logout } from './api/logout';
import { signup } from './api/signup';

const router = express.Router();
const routes = [login, logout, signup];

router.use('/', routes);

export default router;
