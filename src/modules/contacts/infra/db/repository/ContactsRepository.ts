import { prismaClient } from '../../../../../config/prismaClient';

import IContactsRepository from '../../../repositories/IContactsRepository';
import ICreateContactDTO from '../../../dto/ICreateContactDTO';
import IUpdateContactDTO from '../../../dto/IUpdateContactDTO';

import { Contact } from '../models/Contact';

class ContactsRepository implements IContactsRepository {
  public async create({ user_id, name, email, phone, type }: ICreateContactDTO): Promise<Contact> {
    const contact = await prismaClient.contact.create({
      data: {
        name,
        email,
        phone,
        type,
        user_id: user_id,
      }
    })

    return contact as Contact;
  }

  public async findAllContactsByUserId(user_id: string): Promise<Contact[]> {
    const contacts = await prismaClient.contact.findMany({
      where: {
        user_id: user_id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return contacts as Contact[];
  }

  public async findContactById(contact_id: string): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contact_id
      }
    });

    return contact as Contact;
  }

  public async delete(contact_id: string): Promise<void> {
    await prismaClient.contact.delete({
      where: {
        id: contact_id
      }
    });
  }

  public async update(contactToBeUptaded: Partial<IUpdateContactDTO>): Promise<Contact> {
    const updatedContact = await prismaClient.contact.update({
      where: {
        id: contactToBeUptaded.contact_id
      },
      data: contactToBeUptaded
    });

    return updatedContact as Contact;
  }
}

export default ContactsRepository;
