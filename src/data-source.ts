/* eslint-disable prettier/prettier */
import 'dotenv/config'; // Ensure .env variables are loaded
import { DataSource } from 'typeorm';
import { AuditLog } from './modules/audit_log/entities/audit_log.entity';
import { BorrowTransaction } from './modules/borrow_transactions/entities/borrow_transaction.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Fine } from './modules/fines/entities/fine.entity';
import { Librarian } from './modules/librarian/entities/librarian.entity';
import { Publisher } from './modules/publishers/entities/publisher.entity';
import { Reservation } from './modules/reservations/entities/reservation.entity';
import { User } from './modules/user/entities/user.entity';
import { Book } from './modules/books/entities/book.entity';

console.log('Initializing DataSource with entities:', [
  User,
  Book,
  Publisher,
  Reservation,
  Librarian,
  Fine,
  Category,
  BorrowTransaction,
  AuditLog,
]);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Book,
    Publisher,
    Reservation,
    Librarian,
    Fine,
    Category,
    BorrowTransaction,
    AuditLog,
  ],
  migrations: ['src/db/migrations/**/*.{ts,js}'],
  synchronize: false,
  logging: true,
});
