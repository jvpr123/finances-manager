import { Repository } from "typeorm";
import { Transaction } from "./Transaction.entity";

import { ITransactionModel } from "src/domain/models/Transaction.model";
import { ICreateTransactionInput } from "src/domain/dto/transactions/CreateTransaction.dto";

import { ICreateTransactionRepository } from "src/data/protocols/database/transactions/CreateTransactionRepository.interface";
import { IFindTransactionsRepository } from "src/data/protocols/database/transactions/FindTransactionsRepository.interface";
import { IUpdateTransactionRepository } from "src/data/protocols/database/transactions/UpdateTransactionRepository.interface";
import { IDeleteTransactionRepository } from "src/data/protocols/database/transactions/DeleteTransactionRepository.interface";
import { IUpdateTransactionInput } from "src/domain/dto/transactions/UpdateTransaction.dto";

export class TransactionTypeOrmRepository
  implements
    ICreateTransactionRepository,
    IFindTransactionsRepository,
    IUpdateTransactionRepository,
    IDeleteTransactionRepository
{
  constructor(private repository: Repository<Transaction>) {}

  async create(data: ICreateTransactionInput): Promise<ITransactionModel> {
    const transactionToCreate = this.repository.create(data);
    return await this.repository.save(transactionToCreate);
  }

  async findById(id: string): Promise<ITransactionModel> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<ITransactionModel[]> {
    return await this.repository.find();
  }

  async update({
    id,
    ...data
  }: IUpdateTransactionInput): Promise<ITransactionModel> {
    await this.repository.update({ id }, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected ? true : false;
  }
}
