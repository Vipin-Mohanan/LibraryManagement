/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { UserAuthGuard } from 'src/guard/user-auth/user-auth.guard';
import { log } from 'console';

@Controller('borrow')
@UseGuards(UserAuthGuard)
export class BorrowTransactionsController {
  constructor(private readonly borrowTransactionsService: BorrowTransactionsService) {}
  
  @Post('/borrowBook')
  @UseGuards(UserAuthGuard)
  async borrowBook(@Body() borrowdto:CreateBorrowTransactionDto){
    return await this.borrowTransactionsService.borrowBook(borrowdto)
  }

  
  @Get('/viewBorrowBooks/:id')
  @UseGuards(UserAuthGuard)
  async borrowBookDetails(@Param('id') id :number){
    return await this.borrowTransactionsService.borrowBookDetails(id);
  }

  @Patch('/return')
  @UseGuards(UserAuthGuard)
  async updateReturnedBook(@Query('user_id')user_id:number, @Query('book_id')book_id:number)
  { 
    console.log("req reached hereeee")
    return await this.borrowTransactionsService.updateReturnedBook(user_id, book_id)
  }
  
}
