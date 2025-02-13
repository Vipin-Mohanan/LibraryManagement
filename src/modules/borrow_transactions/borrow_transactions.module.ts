/* eslint-disable prettier/prettier */

import { Book } from 'src/modules/books/entities/book.entity';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowTransaction } from './entities/borrow_transaction.entity';
import { BorrowTransactionsController } from './borrow_transactions.controller';
import { User } from '../user/entities/user.entity';
import { BorrowTransactionsMiddleware } from 'src/middleware/borrow_transactions/borrow_transactions.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([BorrowTransaction,Book,User])],
  controllers: [BorrowTransactionsController],
  providers: [BorrowTransactionsService],
})
export class BorrowTransactionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BorrowTransactionsMiddleware).forRoutes(BorrowTransactionsController)
  }

}
