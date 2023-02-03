import IContactsRepository from '../../../repositories/IContactsRepository';
import ICreateContactDTO from '../../../dto/ICreateContactDTO';

import { IContact, Contact } from '../models/Contact';

class ContactsRepository implements IContactsRepository {
  public async create({ user_id, name, email, phone, type }: ICreateContactDTO): Promise<IContact> {
    const contact = new Contact({ name, email, phone, type, user: user_id });

    await contact.save();

    return contact as IContact;
  }

  public async findAllContactsByUserId(user_id: string): Promise<IContact[]> {
    const contacts = await Contact.find({ user: user_id }).sort({
      date: -1,
    });

    return contacts as IContact[];
  }
}

export default ContactsRepository;
