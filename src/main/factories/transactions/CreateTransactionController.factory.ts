import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateTransactionJoiSchema } from "src/infra/validation/joi/schemas/transactions/CreateTransaction.schema";

import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";

import { CreateTransactionUseCase } from "src/data/useCases/transactions/create/CreateTransaction.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateTransactionController } from "src/presentation/controllers/transactions/create/CreateTransaction.controller";

export const makeCreateTransactionController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateTransactionJoiSchema);
  const repository = new TransactionTypeOrmRepository(
    TypeOrmDataSource.getRepository<Transaction>(Transaction)
  );

  const createTransactionUseCase = new CreateTransactionUseCase(
    validator,
    repository
  );

  return new CreateTransactionController(createTransactionUseCase);
};
