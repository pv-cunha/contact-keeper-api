import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import ContactsRepository from '../../db/repository/ContactsRepository';
import CreateContactsService from '../../../services/CreateContactsService';
import ListUserContactsService from '../../../services/ListUserContactsService';
import UpdateContactService from '../../../services/UpdateContactService';
import DeleteContactService from '../../../services/DeleteContactService';

const contactsRepository = new ContactsRepository();
const createContactsService = new CreateContactsService(contactsRepository);
const listUserContactsService = new ListUserContactsService(contactsRepository);
const updateContactService = new UpdateContactService(contactsRepository);
const deleteContactService = new DeleteContactService(contactsRepository);

export default class ContactsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const user_id = request.user.id;
    const { name, email, phone, type } = request.body;

    const contact = await createContactsService.execute({ user_id, name, email, phone, type });

    return response.status(200).json({ contact });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const contacts = await listUserContactsService.execute({ user_id });

    return response.status(200).json({ contacts });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const contact_id = request.params.id;
    const { name, email, phone, type } = request.body;

    const updatedContact = await updateContactService.execute({ user_id, contact_id, name, email, phone, type });

    return response.status(200).json({ updatedContact });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const contact_id = request.params.id;

    await deleteContactService.execute({ user_id, contact_id });

    return response.status(200).json({ msg: `Contact ${contact_id} for user ${user_id} has been deleted !` });
  }
}
