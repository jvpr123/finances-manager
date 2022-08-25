import { IUserModel } from "src/domain/models/User.model";
import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";

import { IFindAllUsersRepository } from "src/data/protocols/database/FindAllUsersRepository.interface";

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private readonly repository: IFindAllUsersRepository) {}

  async execute(): Promise<Partial<IUserModel>[]> {
    return await this.repository.findAll();
  }
}
