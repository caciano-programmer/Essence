import express from 'express';
import { errorWrapper } from '../../errorWrapper';

const githubUrl = state => `
    https://github.com/login/oauth/authorize?
    client_id=${null}&
    redirect_uri=http://localhost:4000&
    scope=user&
    state=${state}&
    allow_signup=true
`;
const router = express.Router();

router.get(
  '/oauth/github',
  errorWrapper(async (req, res) => {
    res.status(301).send(githubUrl);
  }),
);

router.get(
  '/oauth/github/response',
  errorWrapper(async (req, res) => {
    res.status(200).redirect('/');
  }),
);

export { router as github };
