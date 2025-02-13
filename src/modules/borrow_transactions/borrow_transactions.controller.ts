/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';

@Controller('borrow')
export class BorrowTransactionsController {
  constructor(private readonly borrowTransactionsService: BorrowTransactionsService) {}
  
  @Post('/borrowBook')
  async borrowBook(@Body() borrowdto:CreateBorrowTransactionDto){
    return await this.borrowTransactionsService.borrowBook(borrowdto)
  }

  
  @Get('/viewBorrowBooks/:id')
  async borrowBookDetails(@Param('id') id :number){
    return this.borrowTransactionsService.borrowBookDetails(id);
  }

  @Patch('/return')
  async updateReturnedBook(@Query('user_id')user_id:number, @Query('book_id')book_id:number)
  { 
    
    return await this.borrowTransactionsService.updateReturnedBook(user_id, book_id)
  }
  
}
