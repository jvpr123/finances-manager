import { DataSource } from "typeorm";
import { User } from "./users/User.entity";

export const TypeOrmDataSource = new DataSource({
  type: "sqlite",
  database: "tmp/db.sqlite",
  synchronize: true,
  entities: [User],
});
