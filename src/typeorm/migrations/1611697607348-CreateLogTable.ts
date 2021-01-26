import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLogTable1611697607348 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'errors',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        generationStrategy: 'increment'
      }, {
        name: 'date',
        type: 'date',
        isNullable: false
      }, {
        name: 'error_stac',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'isResolved',
        type: 'boolean',
        isNullable: false
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
