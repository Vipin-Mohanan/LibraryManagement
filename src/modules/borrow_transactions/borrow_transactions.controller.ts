import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { UserAuthGuard } from '../../guard/user-auth/user-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowTransactionsController {
  constructor(private readonly borrowTransactionsService: BorrowTransactionsService) {}
  
  @Post('/borrowBook')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Borrow book' })
  @ApiResponse({ status: 201, description: 'Borrow the book and return the remaining copies available' })
  async borrowBook(@Body() borrowdto:CreateBorrowTransactionDto){
   const borrowedBook = await this.borrowTransactionsService.borrowBook(borrowdto)
      return {
        status: 'success',
        data: {
              "book_id:":borrowedBook.book_id,
              "copies_available:":borrowedBook.copies_available
            }
      };
  }

  
  @Get('/viewBorrowBooks/:id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Borrow book details' })
  @ApiResponse({ status: 201, description: 'Returns the data of the books that has been borrowed' })
  async borrowBookDetails(@Param('id') id:string){
    const borrowedBooks= await this.borrowTransactionsService.borrowBookDetails(Number(id));
      return {
      status: 'success',
      data: borrowedBooks,
    };
  }

  @Patch('/return')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Return the book' })
  @ApiResponse({ status: 201, description: 'Update the available book data' })
  async updateReturnedBook(@Query('user_id')user_id:number, @Query('book_id')book_id:number)
  { 
    const updatedData = await this.borrowTransactionsService.updateReturnedBook(user_id, book_id)
    return {
      status: 'Success',
      data: {
        returnDate: updatedData.return_date
      }
    };
  }
  
}
