import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684785796774 implements MigrationInterface {
    name = 'Migration1684785796774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "text" character varying NOT NULL, "rating" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL, "editDate" TIMESTAMP NOT NULL, "authorId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_edit_user_user" ("postsId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_556c9795234bc68437ad6dc0fcb" PRIMARY KEY ("postsId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31d4db2b3d2655b78ce0a7a4e8" ON "posts_edit_user_user" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_842f062ec2de7cc79e223bafc1" ON "posts_edit_user_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_edit_user_user" ADD CONSTRAINT "FK_31d4db2b3d2655b78ce0a7a4e82" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_edit_user_user" ADD CONSTRAINT "FK_842f062ec2de7cc79e223bafc10" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_edit_user_user" DROP CONSTRAINT "FK_842f062ec2de7cc79e223bafc10"`);
        await queryRunner.query(`ALTER TABLE "posts_edit_user_user" DROP CONSTRAINT "FK_31d4db2b3d2655b78ce0a7a4e82"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_842f062ec2de7cc79e223bafc1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31d4db2b3d2655b78ce0a7a4e8"`);
        await queryRunner.query(`DROP TABLE "posts_edit_user_user"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
