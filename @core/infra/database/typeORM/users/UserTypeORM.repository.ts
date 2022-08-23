import { IUserModel } from "@core/domain/models/User.model";
import { ICreateUserDto } from "@core/domain/dto/users/CreateUser.dto";

import { IUserRepository } from "@core/data/protocols/UserRepository.interface";
import { Repository } from "typeorm";
import { User } from "./User.entity";

export class UserTypeOrmRepository implements IUserRepository {
  constructor(private repository: Repository<User>) {}

  async create(data: ICreateUserDto): Promise<Omit<IUserModel, "password">> {
    const userToCreate = this.repository.create(data);
    return await this.repository.save(userToCreate);
  }
}
