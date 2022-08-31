import { IController } from "src/presentation/protocols/Controller.interface";
import { FindAllTransactionsController } from "src/presentation/controllers/transactions/read/FindAllTransactions.controller";

import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";

import { FindAllTransactionsUseCase } from "src/data/useCases/transactions/read/FindAllTransactions.usecase";

export const makeFindAllTransactionsController = (): IController => {
  const repository = new TransactionTypeOrmRepository(
    TypeOrmDataSource.getRepository<Transaction>(Transaction)
  );

  const findAllTransactionsUseCase = new FindAllTransactionsUseCase(repository);

  return new FindAllTransactionsController(findAllTransactionsUseCase);
};
