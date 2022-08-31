import { Repository } from "typeorm";
import { Transaction } from "./Transaction.entity";

import { ITransactionModel } from "src/domain/models/Transaction.model";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";

import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";
import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";

export class TransactionTypeOrmRepository
  implements ICreateTransactionRepository, IFindTransactionsRepository
{
  constructor(private repository: Repository<Transaction>) {}

  async create(data: ICreateTransactionInput): Promise<ITransactionModel> {
    const transactionToCreate = this.repository.create(data);
    return await this.repository.save(transactionToCreate);
  }

  async findById(id: string): Promise<ITransactionModel> {
    return await this.repository.findOneBy({ id });
  }
}
