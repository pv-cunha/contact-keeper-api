import ICreateContactDTO from '../dto/ICreateContactDTO';
import { IContact } from '../infra/db/models/Contact';

export default interface IContactsRepository {
  create: (data: ICreateContactDTO) => Promise<IContact>;
  findAllContactsByUserId: (id: string) => Promise<IContact[]>;
  // update: (id: string) => Promise<IContact | undefined>;
  // delete: (id: string) => Promise<IContact | undefined>;
}
