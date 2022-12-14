import { DataSource } from "typeorm";

import { User } from "./users/User.entity";
import { Unit } from "./units/Unit.entity";
import { Transaction } from "./transactions/Transaction.entity";
import { Category } from "./categories/Category.entity";
import { Tag } from "./tags/Tag.entity";

export const TypeOrmDataSource = new DataSource({
  type: "sqlite",
  database: "tmp/db.sqlite",
  synchronize: true,
  entities: [User, Unit, Transaction, Category, Tag],
  migrationsTableName: "migrations_table",
  migrations: ["src/infra/database/typeORM/migrations"],
});
