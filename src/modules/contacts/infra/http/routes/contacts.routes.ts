import { Router } from 'express';
import { check } from 'express-validator';

import ensureAuthenticated from '../../../../users/infra/http/middleware/ensureAuthenticate';

import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();
const contactsController = new ContactsController();

contactsRouter.use(ensureAuthenticated);

contactsRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type must be personal or professional').isIn(['personal', 'professional']),
  ],
  contactsController.create,
);

contactsRouter.get('/', contactsController.show);

contactsRouter.put('/:id', contactsController.update);

contactsRouter.delete('/:id', contactsController.delete);

export default contactsRouter;
