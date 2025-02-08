import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739012674751 implements MigrationInterface {
  name = 'Migration1739012674751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "url_image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "url_image"`);
  }
}
