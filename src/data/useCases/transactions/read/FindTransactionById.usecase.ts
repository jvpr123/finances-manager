import { ITransactionModel } from "src/domain/models/Transaction.model";
import { IFindTransactionByIdUseCase } from "src/domain/useCases/transactions/read/FindTransactionById.interface";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";

import { NotFoundError } from "src/errors/NotFound.error";

export class FindTransactionByIdUseCase implements IFindTransactionByIdUseCase {
  constructor(private readonly repository: IFindTransactionsRepository) {}

  async execute(id: string): Promise<ITransactionModel> {
    const transactionFound = await this.repository.findById(id);

    if (!transactionFound)
      throw new NotFoundError(
        `Could not find data related to provided transaction ID`
      );

    return transactionFound;
  }
}
