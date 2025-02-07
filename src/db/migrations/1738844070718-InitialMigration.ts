import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738844070718 implements MigrationInterface {
    name = 'InitialMigration1738844070718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ALTER COLUMN "return_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ALTER COLUMN "return_date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ALTER COLUMN "return_date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ALTER COLUMN "return_date" SET NOT NULL`);
    }

}
