import express from 'express';
import { errorWrapper } from '../errorWrapper';
import { verifyJwt } from '../../auth/jwt';

const router = express.Router();
const error = new Error('authentication unsuccessful, please try logging in again');

// Makes sure csrf token in jwt, header, and csrf cookie all match, else throws error
router.post(
  '/authorize',
  errorWrapper(async (req, res) => {
    if (!req.cookies || !req.cookies.jwt || !req.cookies.csrf || !req.header('csrf-token')) throw error;
    const csrf = (await verifyJwt(req.cookies.jwt)).uuid;
    if (csrf !== req.header('csrf-token') || csrf !== req.cookies.csrf) throw error;
    res.status(200).send();
  }),
);

export { router as authorize };
