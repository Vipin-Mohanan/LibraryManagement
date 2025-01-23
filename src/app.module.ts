/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { UserModule } from './modules/user/user.module';
import { LibrarianModule } from './modules/librarian/librarian.module';
import { FinesModule } from './modules/fines/fines.module';
import { PublishersModule } from './modules/publishers/publishers.module';

@Module({
  imports: [UserModule, LibrarianModule, FinesModule, PublishersModule],
=======
import { BooksModule } from './modules/books/books.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BorrowTransactionsModule } from './modules/borrow_transactions/borrow_transactions.module';

@Module({
  imports: [BooksModule, CategoriesModule, BorrowTransactionsModule],
>>>>>>> 3483fe6d0026ca9944d70021e2b30b04469dc478
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
