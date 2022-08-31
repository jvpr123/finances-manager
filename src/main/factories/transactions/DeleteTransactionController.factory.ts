import { IController } from "src/presentation/protocols/Controller.interface";
import { DeleteTransactionController } from "src/presentation/controllers/transactions/delete/DeleteTransaction.controller";

import { DeleteTransactionUseCase } from "src/data/useCases/transactions/delete/DeleteTransaction.usecase";

import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

export const makeDeleteTransactionController = (): IController => {
  const repository = new TransactionTypeOrmRepository(
    TypeOrmDataSource.getRepository<Transaction>(Transaction)
  );

  const deleteTransactionUseCase = new DeleteTransactionUseCase(repository);

  return new DeleteTransactionController(deleteTransactionUseCase);
};
