import ICreateContactDTO from '../dto/ICreateContactDTO';
import IUpdateContactDTO from '../dto/IUpdateContactDTO';
import { IContact } from '../infra/db/models/Contact';

export default interface IContactsRepository {
  create: (data: ICreateContactDTO) => Promise<IContact>;
  findAllContactsByUserId: (user_id: string) => Promise<IContact[]>;
  findContactById: (contact_id: string) => Promise<IContact | undefined>;
  update: (data: IUpdateContactDTO) => Promise<IContact | undefined>;
  delete: (contact_id: string) => Promise<void>;
}
