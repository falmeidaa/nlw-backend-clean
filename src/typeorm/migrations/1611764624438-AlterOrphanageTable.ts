import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterOrphanageTable1611764624438 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "orphanages" ALTER COLUMN "latitude" TYPE float')
    await queryRunner.query('ALTER TABLE "orphanages" ALTER COLUMN "longitude" TYPE float')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "orphanages" ALTER COLUMN "latitude" TYPE integer')
    await queryRunner.query('ALTER TABLE "orphanages" ALTER COLUMN "longitude" TYPE integer')
  }
}
