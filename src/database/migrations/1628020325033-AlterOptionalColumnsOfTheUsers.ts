import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterOptionalColumnsOfTheUsers1628020325033
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'lastName');
    await queryRunner.dropColumn('users', 'profileImageUrl');
    await queryRunner.dropColumn('users', 'bio');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lastName',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'profileImageUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'bio',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'lastName');
    await queryRunner.dropColumn('users', 'profileImageUrl');
    await queryRunner.dropColumn('users', 'bio');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lastName',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'profileImageUrl',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'bio',
        type: 'varchar',
      }),
    );
  }
}
