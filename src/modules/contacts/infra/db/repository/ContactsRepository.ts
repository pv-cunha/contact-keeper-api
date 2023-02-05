import IContactsRepository from '../../../repositories/IContactsRepository';
import ICreateContactDTO from '../../../dto/ICreateContactDTO';
import IUpdateContactDTO from '../../../dto/IUpdateContactDTO';

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

  public async findContactById(contact_id: string): Promise<IContact> {
    const contact = await Contact.findOne({ contact_id });

    return contact as IContact;
  }

  public async delete(contact_id: string): Promise<void> {
    await Contact.deleteOne({ _id: contact_id });
  }

  public async update(contactToBeUptaded: IUpdateContactDTO): Promise<IContact> {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactToBeUptaded.contact_id },
      { $set: contactToBeUptaded },
      { new: true },
    );

    return updatedContact as IContact;
  }
}

export default ContactsRepository;
