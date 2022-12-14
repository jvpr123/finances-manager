import { JoiValidatorAdapter } from "src/infra/validation/joi/JoiValidator.adapter";
import { CreateTransactionJoiSchema } from "src/infra/validation/joi/schemas/transactions/CreateTransaction.schema";

import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";

import { TypeOrmDataSource } from "src/infra/database/typeORM/DataSource.config";
import { UnitTypeOrmRepository } from "src/infra/database/typeORM/units/UnitTypeORM.repository";
import { CategoryTypeOrmRepository } from "src/infra/database/typeORM/categories/CategoryTypeORM.repository";
import { TagTypeOrmRepository } from "src/infra/database/typeORM/tags/TagTypeORM.repository";
import { TransactionTypeOrmRepository } from "src/infra/database/typeORM/transactions/TransactionTypeORM.repository";

import { CreateTransactionUseCase } from "src/data/useCases/transactions/create/CreateTransaction.usecase";

import { IController } from "src/presentation/protocols/Controller.interface";
import { CreateTransactionController } from "src/presentation/controllers/transactions/create/CreateTransaction.controller";

export const makeCreateTransactionController = (): IController => {
  const validator = new JoiValidatorAdapter(CreateTransactionJoiSchema);

  const unitsRepository = new UnitTypeOrmRepository(
    TypeOrmDataSource.getRepository<Unit>(Unit)
  );
  const categoriesRepository = new CategoryTypeOrmRepository(
    TypeOrmDataSource.getRepository<Category>(Category)
  );
  const tagsRepository = new TagTypeOrmRepository(
    TypeOrmDataSource.getRepository<Tag>(Tag)
  );
  const transactionsRepository = new TransactionTypeOrmRepository(
    TypeOrmDataSource.getRepository<Transaction>(Transaction)
  );

  const createTransactionUseCase = new CreateTransactionUseCase(
    validator,
    unitsRepository,
    categoriesRepository,
    tagsRepository,
    transactionsRepository
  );

  return new CreateTransactionController(createTransactionUseCase);
};
