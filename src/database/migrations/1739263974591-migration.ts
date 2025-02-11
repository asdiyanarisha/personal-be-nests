import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739263974591 implements MigrationInterface {
    name = 'Migration1739263974591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_tags_tag" ("blogId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_163bef1f79bd1f15b07f75e072d" PRIMARY KEY ("blogId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9572d27777384d535f77ed780d" ON "blog_tags_tag" ("blogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_066934a149d9efba507443ce88" ON "blog_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_9572d27777384d535f77ed780d0" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" ADD CONSTRAINT "FK_066934a149d9efba507443ce889" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_066934a149d9efba507443ce889"`);
        await queryRunner.query(`ALTER TABLE "blog_tags_tag" DROP CONSTRAINT "FK_9572d27777384d535f77ed780d0"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "tags" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_066934a149d9efba507443ce88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9572d27777384d535f77ed780d"`);
        await queryRunner.query(`DROP TABLE "blog_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
