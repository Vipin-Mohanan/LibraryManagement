import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738134760642 implements MigrationInterface {
    name = 'InitialMigration1738134760642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_status" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "membership_status" DROP DEFAULT`);
    }

}
