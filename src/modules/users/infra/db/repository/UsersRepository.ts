import IUserRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dto/ICreateUserDTO';

import { User, IUser } from '../models/User';

class UsersRepository implements IUserRepository {
  public async create({ name, email, password }: ICreateUserDTO): Promise<IUser> {
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await new User(user).save();

    return user;
  }

  public async findById(id: String): Promise<IUser> {
    const user = await User.findById(id);

    return user as IUser;
  }

  public async findByEmail(email: String): Promise<IUser> {
    const user = await User.findOne({ email });

    return user as IUser;
  }
}

export default UsersRepository;
