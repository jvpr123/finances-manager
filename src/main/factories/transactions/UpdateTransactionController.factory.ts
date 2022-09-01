import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { UpdateTransactionJoiSchema } from "src/infra/validation/joi/schemas/transactions/UpdateTransaction.schema";

import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";
import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

import { UpdateTransactionUseCase } from "src/data/useCases/transactions/update/UpdateTransaction.usecase";

import { UpdateTransactionController } from "src/presentation/controllers/transactions/update/UpdateTransaction.controller";

export const makeUpdateTransactionController =
  (): UpdateTransactionController => {
    const validator = new JoiValidatorAdapter(UpdateTransactionJoiSchema);
    const repository = new TransactionTypeOrmRepository(
      TypeOrmDataSource.getRepository<Transaction>(Transaction)
    );

    const updateTransactionUseCase = new UpdateTransactionUseCase(
      validator,
      repository
    );

    return new UpdateTransactionController(updateTransactionUseCase);
  };
