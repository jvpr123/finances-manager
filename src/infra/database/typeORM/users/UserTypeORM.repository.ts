import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { ICreateUserRepository } from "src/data/protocols/database/CreateUserRepository.interface";

import { Repository } from "typeorm";
import { User } from "./User.entity";
import { IFindUserRepository } from "src/data/protocols/database/FindUserRepository.interface";

export class UserTypeOrmRepository
  implements ICreateUserRepository, IFindUserRepository
{
  constructor(private repository: Repository<User>) {}

  async create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">> {
    const userToCreate = this.repository.create(data);
    return await this.repository.save(userToCreate);
  }

  async findByEmail(email: string): Promise<Omit<IUserModel, "password">> {
    return await this.repository.findOneBy({ email });
  }
}
