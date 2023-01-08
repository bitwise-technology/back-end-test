import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673218170532 implements MigrationInterface {
    name = 'default1673218170532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followers"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "following"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "public_repos"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "public_url_user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "public_url_user" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "public_repos" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "following" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "followers" integer`);
    }

}
