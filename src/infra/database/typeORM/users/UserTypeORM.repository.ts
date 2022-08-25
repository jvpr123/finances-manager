import { Repository } from "typeorm";
import { User } from "./User.entity";

import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";

import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";
import { ICreateUserRepository } from "src/data/protocols/database/CreateUserRepository.interface";
import { IDeleteUserRepository } from "src/data/protocols/database/DeleteUserRepository.interface";

export class UserTypeOrmRepository
  implements ICreateUserRepository, IFindUsersRepository, IDeleteUserRepository
{
  constructor(private repository: Repository<User>) {}

  async create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">> {
    const userToCreate = this.repository.create(data);
    return await this.repository.save(userToCreate);
  }

  async findByEmail(email: string): Promise<Omit<IUserModel, "password">> {
    return await this.repository.findOneBy({ email });
  }

  async findById(id: string): Promise<Omit<IUserModel, "password">> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Omit<IUserModel, "password">[]> {
    return await this.repository.find();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? true : false;
  }
}
