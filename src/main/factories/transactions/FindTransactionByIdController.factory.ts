import { IController } from "src/presentation/protocols/Controller.interface";
import { FindTransactionByIdController } from "src/presentation/controllers/transactions/read/FindTRansactionById.controller";

import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";

import { FindTransactionByIdUseCase } from "src/data/useCases/transactions/read/FindTransactionById.usecase";

export const makeFindTransactionByIdController = (): IController => {
  const repository = new TransactionTypeOrmRepository(
    TypeOrmDataSource.getRepository<Transaction>(Transaction)
  );

  const findTransactionByIdUseCase = new FindTransactionByIdUseCase(repository);

  return new FindTransactionByIdController(findTransactionByIdUseCase);
};
