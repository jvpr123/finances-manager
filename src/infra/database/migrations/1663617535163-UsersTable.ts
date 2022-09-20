import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersTable1663617535163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, isUnique: true },
          { name: "name", type: "varchar", width: 255 },
          { name: "email", type: "varchar", width: 100, isUnique: true },
          { name: "password", type: "varchar", width: 100 },
          { name: "phone", type: "varchar", width: 50 },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users", true, true);
  }
}
