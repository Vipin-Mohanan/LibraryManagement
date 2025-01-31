import { Book } from 'src/modules/books/entities/book.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowTransaction } from './entities/borrow_transaction.entity';
import { BorrowTransactionsController } from './borrow_transactions.controller';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BorrowTransaction,Book,User])],
  controllers: [BorrowTransactionsController],
  providers: [BorrowTransactionsService],
})
export class BorrowTransactionsModule {}
