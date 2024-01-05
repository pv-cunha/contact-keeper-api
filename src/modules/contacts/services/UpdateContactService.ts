import IContactsRepository from '../repositories/IContactsRepository';

import AppError from '../../../shared/errors/AppError';
import IUpdateContactDTO from '../dto/IUpdateContactDTO';
import IContactDTO from '../dto/IContactDTO';

interface Request {
  user_id: string;
  contact_id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

class UpdateContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  public async execute({ user_id, contact_id, name, email, phone, type }: Request): Promise<IContactDTO> {
    const contact = await this.contactsRepository.findContactById(contact_id);

    if (!contact) {
      throw new AppError('Contact not found !', 404);
    }

    // Make sure user owns contact
    if (contact.id !== user_id) {
      throw new AppError('This contact does not belong to the logged-in user. !');
    }

    // Build contact object
    const contactToBeUptaded = {} as IUpdateContactDTO;
    contactToBeUptaded.contact_id = contact_id;
    contactToBeUptaded.user_id = user_id;

    if (name) contactToBeUptaded.name = name;
    if (email) contactToBeUptaded.email = email;
    if (phone) contactToBeUptaded.phone = phone;
    if (type) contactToBeUptaded.type = type;

    const updatedContact = await this.contactsRepository.update(contactToBeUptaded);

    const contactDTO = {
      contact_id: updatedContact?.id,
      name: updatedContact?.name,
      email: updatedContact?.email,
      phone: updatedContact?.phone,
      type: updatedContact?.type,
    };

    return contactDTO as IContactDTO;
  }
}

export default UpdateContactService;
