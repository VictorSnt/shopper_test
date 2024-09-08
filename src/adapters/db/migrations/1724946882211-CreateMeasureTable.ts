import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMeasureTable1724946882211 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'measurement',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'image',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'mesureValue',
          type: 'decimal',
          precision: 10,
          scale: 2,
        },
        {
          name: 'customerCode',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'measureDatetime',
          type: 'timestamp',
        },
        {
          name: 'measureType',
          type: 'enum',
          enum: ['WATER', 'GAS'],
        },
        {
          name: 'confirmed',
          type: 'boolean',
          default: false,
        },
        {
          name: 'status',
          type: 'boolean',
          default: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('measurement');
  }
}