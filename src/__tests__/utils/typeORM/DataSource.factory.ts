import { DataSource } from "typeorm";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";
import { Tag } from "src/infra/database/typeORM/tags/Tag.entity";

export const makeDataSource = async () => {
  const ds = new DataSource({
    type: "sqlite",
    database: "tmp/db.sqlite",
    synchronize: true,
    entities: [User, Unit, Transaction, Category, Tag],
  });

  await ds.initialize();
  await ds.synchronize();
  return ds;
};
