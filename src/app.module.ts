/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BorrowTransactionsModule } from './modules/borrow_transactions/borrow_transactions.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { AuditLogModule } from './modules/audit_log/audit_log.module';

@Module({
  imports: [BooksModule, CategoriesModule, BorrowTransactionsModule, ReservationsModule, AuditLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
