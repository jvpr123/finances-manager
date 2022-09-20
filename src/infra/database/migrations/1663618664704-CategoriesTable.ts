import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CategoriesTable1663618664704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          { name: "id", type: "varchar", isPrimary: true, isUnique: true },
          { name: "title", type: "varchar", width: 100, isUnique: true },
          { name: "description", type: "varchar", width: 255 },
          { name: "color", type: "varchar", width: 20 },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories", true, true);
  }
}
