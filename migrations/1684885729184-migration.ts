import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684885729184 implements MigrationInterface {
    name = 'Migration1684885729184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "rating" integer array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "rating" integer`);
    }

}
