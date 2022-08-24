import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { ICreateUserRepository } from "src/data/protocols/CreateUserRepository.interface";

import { Repository } from "typeorm";
import { User } from "./User.entity";

export class UserTypeOrmRepository implements ICreateUserRepository {
  constructor(private repository: Repository<User>) {}

  async create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">> {
    const userToCreate = this.repository.create(data);
    return await this.repository.save(userToCreate);
  }
}
