import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673209863447 implements MigrationInterface {
    name = 'default1673209863447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "followers" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "following" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "public_repos" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "public_url_user" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "public_url_user"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "public_repos"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "following"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followers"`);
    }

}
