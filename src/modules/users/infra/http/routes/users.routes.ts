import { Router } from 'express';
import { check } from 'express-validator';

import ensureAuthenticate from '../middleware/ensureAuthenticate';

import UsersController from '../controllers/UsersController';
import AuthenticateController from '../controllers/AuthenticateController';

const usersRouter = Router();
const usersController = new UsersController();
const authenticateController = new AuthenticateController();

usersRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  usersController.create,
);

usersRouter.post('/validate', ensureAuthenticate, authenticateController.show);

export default usersRouter;
