import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685402156064 implements MigrationInterface {
    name = 'Migration1685402156064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_permission_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_edf7d0299bc35b256e498a696a9" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d0249b430d2bd7ac0856dd352f" ON "user_permission_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_642fa08fa2955d26b5f335ffa3" ON "user_permission_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "user_permission_permission" ADD CONSTRAINT "FK_d0249b430d2bd7ac0856dd352fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permission_permission" ADD CONSTRAINT "FK_642fa08fa2955d26b5f335ffa32" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission_permission" DROP CONSTRAINT "FK_642fa08fa2955d26b5f335ffa32"`);
        await queryRunner.query(`ALTER TABLE "user_permission_permission" DROP CONSTRAINT "FK_d0249b430d2bd7ac0856dd352fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_642fa08fa2955d26b5f335ffa3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0249b430d2bd7ac0856dd352f"`);
        await queryRunner.query(`DROP TABLE "user_permission_permission"`);
    }

}
