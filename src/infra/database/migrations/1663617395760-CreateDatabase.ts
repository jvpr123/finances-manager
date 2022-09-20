import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1663617395760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase("finances_manager", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("finances_manager");
  }
}
