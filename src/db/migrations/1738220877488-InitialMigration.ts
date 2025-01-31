/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738220877488 implements MigrationInterface {
    name = 'InitialMigration1738220877488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fine" ("fine_id" SERIAL NOT NULL, "fine_amount" integer NOT NULL, "payment_status" boolean NOT NULL, "fine_date" TIMESTAMP NOT NULL, "transaction_id" integer, CONSTRAINT "REL_b5dfc90db3dfad1bb121449ba4" UNIQUE ("transaction_id"), CONSTRAINT "PK_256091eb71d11c1c152429f1cbf" PRIMARY KEY ("fine_id"))`);
        await queryRunner.query(`CREATE TABLE "borrow_transaction" ("transaction_id" SERIAL NOT NULL, "borrow_date" TIMESTAMP NOT NULL DEFAULT now(), "due_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "book_id" integer, "user_id" integer, CONSTRAINT "PK_e742af42b458b145a4743e7a0aa" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`ALTER TABLE "fine" ADD CONSTRAINT "FK_b5dfc90db3dfad1bb121449ba4c" FOREIGN KEY ("transaction_id") REFERENCES "borrow_transaction"("transaction_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ADD CONSTRAINT "FK_4605a31e18e970c1d44a3254cd9" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ADD CONSTRAINT "FK_9f52bd7f32b2d3fa0c352dfad77" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_transaction" DROP CONSTRAINT "FK_9f52bd7f32b2d3fa0c352dfad77"`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" DROP CONSTRAINT "FK_4605a31e18e970c1d44a3254cd9"`);
        await queryRunner.query(`ALTER TABLE "fine" DROP CONSTRAINT "FK_b5dfc90db3dfad1bb121449ba4c"`);
        await queryRunner.query(`DROP TABLE "borrow_transaction"`);
        await queryRunner.query(`DROP TABLE "fine"`);
    }

}
