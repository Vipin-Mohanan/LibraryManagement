/* eslint-disable prettier/prettier */
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

export const AppDatSourcer = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'experion@123',
  database: 'library',
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
