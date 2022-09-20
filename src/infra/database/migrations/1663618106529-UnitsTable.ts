import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class UnitsTable1663618106529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "units",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, isUnique: true },
          { name: "name", type: "varchar", width: 255 },
          { name: "description", type: "varchar", width: 100 },
          { name: "initial_balance", type: "decimal" },
          { name: "current_balance", type: "decimal" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "units",
      new TableForeignKey({
        columnNames: ["ownerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("units", true, true);
  }
}
