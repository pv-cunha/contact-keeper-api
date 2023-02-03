import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import ContactsRepository from '../../db/repository/ContactsRepository';
import CreateContactsService from '../../../services/CreateContactsService';
import ListUserContactsService from '../../../services/ListUserContactsService';

const contactsRepository = new ContactsRepository();
const createContactsService = new CreateContactsService(contactsRepository);
const listUserContactsService = new ListUserContactsService(contactsRepository);

export default class ContactsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const user_id = request.user.id;
    const { name, email, phone, type } = request.body;

    const contact = await createContactsService.execute({ user_id, name, email, phone, type });

    return response.json({ contact });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const contacts = await listUserContactsService.execute({ user_id });

    return response.json({ contacts });
  }
}
