import IContactsRepository from '../repositories/IContactsRepository';

import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  contact_id: string;
}

class DeleteContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  public async execute({ user_id, contact_id }: Request): Promise<void> {
    const contact = await this.contactsRepository.findContactById(contact_id);

    if (!contact) {
      throw new AppError('Contact not found !', 404);
    }

    // Make sure user owns contact
    if (contact.id !== user_id) {
      throw new AppError('This contact does not belong to the logged-in user. !');
    }

    await this.contactsRepository.delete(contact_id);
  }
}

export default DeleteContactService;
