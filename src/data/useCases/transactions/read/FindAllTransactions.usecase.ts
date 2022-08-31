import { ITransactionModel } from "src/domain/models/Transaction.model";
import { IFindAllTransactionsUseCase } from "src/domain/useCases/transactions/read/FindAllTransactions.interface";

import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";

export class FindAllTransactionsUseCase implements IFindAllTransactionsUseCase {
  constructor(private readonly repository: IFindTransactionsRepository) {}

  async execute(): Promise<ITransactionModel[]> {
    return await this.repository.findAll();
  }
}
