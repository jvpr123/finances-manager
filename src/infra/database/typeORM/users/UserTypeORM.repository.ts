import { Repository } from "typeorm";
import { User } from "./User.entity";

import { IUserModel } from "src/domain/models/User.model";
import { ICreateUserDto } from "src/domain/dto/users/CreateUser.dto";
import { IUpdateUserInput } from "src/domain/dto/users/UpdateUser.dto";

import { ICreateUserRepository } from "src/data/protocols/database/users/CreateUserRepository.interface";
import { IFindUsersRepository } from "src/data/protocols/database/users/FindUsersRepository.interface";
import { IUpdateUserRepository } from "src/data/protocols/database/users/UpdateUser.interface";
import { IDeleteUserRepository } from "src/data/protocols/database/users/DeleteUserRepository.interface";

export class UserTypeOrmRepository
  implements
    ICreateUserRepository,
    IFindUsersRepository,
    IUpdateUserRepository,
    IDeleteUserRepository
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

  async update({
    id,
    ...data
  }: IUpdateUserInput): Promise<Omit<IUserModel, "password">> {
    await this.repository.update({ id }, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? true : false;
  }
}
