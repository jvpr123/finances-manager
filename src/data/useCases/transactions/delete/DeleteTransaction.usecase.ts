import { IDeleteTransactionUseCase } from "src/domain/useCases/transactions/delete/DeleteTransaction.interface";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { IDeleteTransactionRepository } from "src/data/protocols/database/transactions/DeleteTransactionRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(
    private readonly repository: IFindTransactionsRepository &
      IDeleteTransactionRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const transactionToDelete = await this.repository.findById(id);

    if (!transactionToDelete)
      throw new NotFoundError(
        `Could not delete: data related to ID provided not found`
      );

    return await this.repository.delete(transactionToDelete.id);
  }
}
