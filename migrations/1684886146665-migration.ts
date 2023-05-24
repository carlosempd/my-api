import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684886146665 implements MigrationInterface {
    name = 'Migration1684886146665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "rating" DROP DEFAULT`);
    }

}
