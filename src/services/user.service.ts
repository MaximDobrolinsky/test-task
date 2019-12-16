import { UserModel } from '../db/schemas';
import * as bcrypt from 'bcryptjs';

import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dtos/user';
import { config } from '../config';

class UserService {

  public async getAll(): Promise<IUser[]> {
    return await UserModel.find({}).exec();
  }

  public async getById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).exec();
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).exec();
  }

  public async create(userDto: CreateUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(config.passwordSaltRound);
    const hashedPassword: string = await bcrypt.hash(userDto.password, salt);
    const newUser: CreateUserDto = {
      ...userDto,
      password: hashedPassword,
    };

    return await UserModel.create(newUser);
  }
}

const userService = new UserService();

export {
  userService,
  UserService,
};