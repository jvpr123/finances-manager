import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class TagsTransactionsTable1663633979624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({ name: "tags_transactions" }));

    await queryRunner.createForeignKey(
      "tags_transactions",
      new TableForeignKey({
        columnNames: ["tagId"],
        referencedColumnNames: ["id"],
        referencedTableName: "tags",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "tags_transactions",
      new TableForeignKey({
        columnNames: ["transactionId"],
        referencedColumnNames: ["id"],
        referencedTableName: "transaction",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tags_transactions", true, true);
  }
}
