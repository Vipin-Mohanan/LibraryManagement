/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { AuditLogModule } from './modules/audit_log/audit_log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './modules/books/entities/book.entity';
import { User } from './modules/user/entities/user.entity';
import { Category } from './modules/categories/entities/category.entity';
import { BorrowTransaction } from './modules/borrow_transactions/entities/borrow_transaction.entity';
import { Reservation } from './modules/reservations/entities/reservation.entity';
import { AuditLog } from './modules/audit_log/entities/audit_log.entity';
import { Fine } from './modules/fines/entities/fine.entity';
import { Librarian } from './modules/librarian/entities/librarian.entity';
import { Publisher } from './modules/publishers/entities/publisher.entity';
import { FinesModule } from './modules/fines/fines.module';
import { LibrarianModule } from './modules/librarian/librarian.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { UserModule } from './modules/user/user.module';
import { DataSource } from 'typeorm';
import { BorrowTransactionsModule } from './modules/borrow_transactions/borrow_transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'experion@123',
      database: 'library',
      entities: [User,Book,Publisher,Reservation,Publisher,Fine,AuditLog,Librarian,Category,BorrowTransaction],
      synchronize: false,
    }),
    UserModule,BooksModule,PublishersModule,ReservationsModule,FinesModule,AuditLogModule,LibrarianModule,CategoriesModule,BorrowTransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private AppDatSourcer: DataSource) {}
  
  async onModuleInit() {
    try {
      if (this.AppDatSourcer.isInitialized) {
        console.log('Database connection is already established');
      } else {
        console.error('Database connection is not initialized');
      }
    } catch (error) {
      console.error('Database connection failed:', error.message);
    }
  }
}