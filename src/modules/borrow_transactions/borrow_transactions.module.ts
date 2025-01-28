/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { BorrowTransactionsController } from './borrow_transactions.controller';

@Module({
  controllers: [BorrowTransactionsController],
  providers: [BorrowTransactionsService],
})
export class BorrowTransactionsModule {}
