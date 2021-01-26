import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrphanageTable1611612995290 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        generationStrategy: 'increment'
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'latitude',
        type: 'float',
        isNullable: false
      }, {
        name: 'longitude',
        type: 'float',
        isNullable: false
      }, {
        name: 'about',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'instructions',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'opening_hours',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'open_on_weekends',
        type: 'boolean',
        isNullable: false
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
