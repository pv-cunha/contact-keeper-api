import ICreateContactDTO from '../dto/ICreateContactDTO';
import IUpdateContactDTO from '../dto/IUpdateContactDTO';
import { Contact } from '../infra/db/models/Contact';

export default interface IContactsRepository {
  create: (data: ICreateContactDTO) => Promise<Contact>;
  findAllContactsByUserId: (user_id: string) => Promise<Contact[]>;
  findContactById: (contact_id: string) => Promise<Contact | undefined>;
  update: (data: IUpdateContactDTO) => Promise<Contact | undefined>;
  delete: (contact_id: string) => Promise<void>;
}
