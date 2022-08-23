import { DataSource } from "typeorm";
import { User } from "@core/infra/database/typeORM/users/User.entity";

export const makeDataSource = async () => {
  const ds = new DataSource({
    type: "sqlite",
    database: "tmp/db.sqlite",
    synchronize: true,
    entities: [User],
  });

  await ds.initialize();
  return ds;
};
