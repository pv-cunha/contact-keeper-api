import IContactsRepository from '../repositories/IContactsRepository';

import { Contact } from '../infra/db/models/Contact';

interface Request {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

class CreateContactsService {
  constructor(private contactsRepository: IContactsRepository) {}

  public async execute({ user_id, name, email, phone, type }: Request): Promise<Contact> {
    const contact = await this.contactsRepository.create({ user_id, name, email, phone, type });

    return contact;
  }
}

export default CreateContactsService;
