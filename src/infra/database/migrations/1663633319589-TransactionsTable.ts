import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class TransactionsTable1663633319589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, isUnique: true },
          { name: "title", type: "varchar", width: 100, isUnique: true },
          { name: "description", type: "varchar", width: 255 },
          { name: "value", type: "decimal", unsigned: true },
          { name: "transaction_date", type: "timestamp", default: "now()" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["unitId"],
        referencedColumnNames: ["id"],
        referencedTableName: "units",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions", true, true);
  }
}
