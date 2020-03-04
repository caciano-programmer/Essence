import express from 'express';
import { login } from './api/login';
import { logout } from './api/logout';
import { signup } from './api/signup';
import { authorize } from './api/authorize';
import { google } from './oauth/google/googleApi';
import { github } from './oauth/github/githubApi';

const router = express.Router();
const routes = [login, logout, signup, authorize, google, github];

router.use('/', routes);

export default router;
