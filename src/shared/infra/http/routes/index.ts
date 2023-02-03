import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import contactsRouter from '../../../../modules/contacts/infra/http/routes/contacts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/contacts', contactsRouter);

export default routes;
