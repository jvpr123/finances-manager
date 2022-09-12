import { DataSource } from "typeorm";

import { User } from "src/infra/database/typeORM/users/User.entity";
import { Unit } from "src/infra/database/typeORM/units/Unit.entity";
import { Transaction } from "src/infra/database/typeORM/transactions/Transaction.entity";
import { Category } from "src/infra/database/typeORM/categories/Category.entity";

export const makeDataSource = async () => {
  const ds = new DataSource({
    type: "sqlite",
    database: "tmp/db.sqlite",
    synchronize: true,
    entities: [User, Unit, Transaction, Category],
  });

  await ds.initialize();
  return ds;
};
