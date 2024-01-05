import IContactsRepository from '../repositories/IContactsRepository';

interface Request {
  user_id: string;
}

type IResponse = Array<{
  name: string;
  email: string;
  phone: string;
  type: string;
}>;

class ListUserContactsService {
  constructor(private contactsRepository: IContactsRepository) {}

  public async execute({ user_id }: Request): Promise<IResponse> {
    const contacts = await this.contactsRepository.findAllContactsByUserId(user_id);

    const contactsDTO = contacts.map((contact) => {
      const contactDTO = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        type: contact.type,
        user_id,
        contact_id: contact.id,
      };

      return contactDTO;
    });

    return contactsDTO as unknown as IResponse;
  }
}

export default ListUserContactsService;
