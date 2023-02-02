import { Router } from 'express';
import { check } from 'express-validator';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').isString().notEmpty(),
  ],
  sessionsController.create,
);

export default sessionsRouter;
