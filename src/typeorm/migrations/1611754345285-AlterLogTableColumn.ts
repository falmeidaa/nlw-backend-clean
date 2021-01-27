import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterLogTableColumn1611754345285 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "errors" RENAME COLUMN "error_stac" TO "error_stack"')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "errors" RENAME COLUMN "error_stack" TO "error_stac"')
  }
}
