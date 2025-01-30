import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738152299095 implements MigrationInterface {
    name = 'InitialMigration1738152299095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "librarian" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_status" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "librarian" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."librarian_role_enum" AS ENUM('librarian', 'admin')`);
        await queryRunner.query(`ALTER TABLE "librarian" ADD "role" "public"."librarian_role_enum" NOT NULL DEFAULT 'librarian'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "librarian" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."librarian_role_enum"`);
        await queryRunner.query(`ALTER TABLE "librarian" ADD "role" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "librarian" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
