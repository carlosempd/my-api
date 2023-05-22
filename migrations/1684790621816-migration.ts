import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684790621816 implements MigrationInterface {
    name = 'Migration1684790621816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "creationDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "creationDate" DROP DEFAULT`);
    }

}
