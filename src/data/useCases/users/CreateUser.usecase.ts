import { IUserModel } from "@domain/models/User.model";
import { ICreateUserDto } from "@domain/dto/users/CreateUser.dto";
import { ICreateUserUseCase } from "@domain/useCases/users/create/CreateUser.interface";

import { IEncrypter } from "@data/protocols/Encrypter.interface";
import { IUserRepository } from "@data/protocols/UserRepository.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly repository: IUserRepository
  ) {}

  async execute(createUserDto: ICreateUserDto): Promise<Partial<IUserModel>> {
    const hashedPassword = await this.encrypter.hash(createUserDto.password);
    const createdUser = await this.repository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser;
  }
}
