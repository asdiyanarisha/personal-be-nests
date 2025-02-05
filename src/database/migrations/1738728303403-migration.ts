import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738728303403 implements MigrationInterface {
  name = 'Migration1738728303403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "slug" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "slug"`);
  }
}
