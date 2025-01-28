/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1738059365381 implements MigrationInterface {
    name = 'InitialMigration1738059365381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audit_log" ("log_id" SERIAL NOT NULL, "action_performed" character varying NOT NULL, "user_id" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_80cbc678974d588828aeec45514" PRIMARY KEY ("log_id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" SERIAL NOT NULL, "category_name" character varying NOT NULL, CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" integer NOT NULL, "address" character varying NOT NULL, "membership_date" TIMESTAMP NOT NULL, "membership_status" boolean NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("reservation_id" SERIAL NOT NULL, "reservation_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "book_id" integer, "user_id" integer, CONSTRAINT "PK_1c8fc6b24242c3d8cd5fde324ea" PRIMARY KEY ("reservation_id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("book_id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "publisher" character varying NOT NULL, "publication_year" character varying NOT NULL, "isbn" integer NOT NULL, "copies_availborrowTransactionable" integer NOT NULL, "total_copies" integer NOT NULL, "category_id" integer, CONSTRAINT "PK_b66091a3d2edddc14f6b91fc606" PRIMARY KEY ("book_id"))`);
        await queryRunner.query(`CREATE TABLE "fine" ("fine_id" SERIAL NOT NULL, "fine_amount" integer NOT NULL, "payment_status" boolean NOT NULL, "fine_date" TIMESTAMP NOT NULL, "transaction_id" integer, CONSTRAINT "REL_b5dfc90db3dfad1bb121449ba4" UNIQUE ("transaction_id"), CONSTRAINT "PK_256091eb71d11c1c152429f1cbf" PRIMARY KEY ("fine_id"))`);
        await queryRunner.query(`CREATE TABLE "borrow_transaction" ("transaction_id" SERIAL NOT NULL, "borrow_date" TIMESTAMP NOT NULL, "due_date" TIMESTAMP NOT NULL, "return_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "book_id" integer, "user_id" integer, CONSTRAINT "PK_e742af42b458b145a4743e7a0aa" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "librarian" ("librarian_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone_number" integer NOT NULL, "address" character varying NOT NULL, "role" boolean NOT NULL, CONSTRAINT "PK_7f219fcfb79e4d0837e90e231f0" PRIMARY KEY ("librarian_id"))`);
        await queryRunner.query(`CREATE TABLE "publisher" ("publisher_id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" integer NOT NULL, CONSTRAINT "PK_a885e2b75196347e48a3234d8ec" PRIMARY KEY ("publisher_id"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_9449953ea389d07cbef0b415c12" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fine" ADD CONSTRAINT "FK_b5dfc90db3dfad1bb121449ba4c" FOREIGN KEY ("transaction_id") REFERENCES "borrow_transaction"("transaction_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ADD CONSTRAINT "FK_4605a31e18e970c1d44a3254cd9" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" ADD CONSTRAINT "FK_9f52bd7f32b2d3fa0c352dfad77" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_transaction" DROP CONSTRAINT "FK_9f52bd7f32b2d3fa0c352dfad77"`);
        await queryRunner.query(`ALTER TABLE "borrow_transaction" DROP CONSTRAINT "FK_4605a31e18e970c1d44a3254cd9"`);
        await queryRunner.query(`ALTER TABLE "fine" DROP CONSTRAINT "FK_b5dfc90db3dfad1bb121449ba4c"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_e219b0a4ff01b85072bfadf3fd7"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_9449953ea389d07cbef0b415c12"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
        await queryRunner.query(`DROP TABLE "librarian"`);
        await queryRunner.query(`DROP TABLE "borrow_transaction"`);
        await queryRunner.query(`DROP TABLE "fine"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "audit_log"`);
    }

}
