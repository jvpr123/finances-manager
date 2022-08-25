import { IUserModel } from "src/domain/models/User.model";
import { IFindAllUsersUseCase } from "src/domain/useCases/users/read/FindAllUsers.interface";

import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private readonly repository: IFindUsersRepository) {}

  async execute(): Promise<Partial<IUserModel>[]> {
    return await this.repository.findAll();
  }
}
