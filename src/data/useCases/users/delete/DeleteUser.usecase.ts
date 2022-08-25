import { IDeleteUserUseCase } from "src/domain/useCases/users/delete/DeleteUser.interface";

import { IDeleteUserRepository } from "src/data/protocols/database/DeleteUserRepository.interface";
import { IFindUsersRepository } from "src/data/protocols/database/FindUsersRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class DeleteUserlUseCase implements IDeleteUserUseCase {
  constructor(
    private readonly repository: IFindUsersRepository & IDeleteUserRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const userToDelete = await this.repository.findById(id);

    if (!userToDelete)
      throw new NotFoundError(
        `Could not delete: data related to ID ${id} not found`
      );

    return await this.repository.delete(id);
  }
}
