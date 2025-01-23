import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { UpdateBorrowTransactionDto } from './dto/update-borrow_transaction.dto';

@Controller('borrow-transactions')
export class BorrowTransactionsController {
  constructor(private readonly borrowTransactionsService: BorrowTransactionsService) {}

  @Post()
  create(@Body() createBorrowTransactionDto: CreateBorrowTransactionDto) {
    return this.borrowTransactionsService.create(createBorrowTransactionDto);
  }

  @Get()
  findAll() {
    return this.borrowTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowTransactionDto: UpdateBorrowTransactionDto) {
    return this.borrowTransactionsService.update(+id, updateBorrowTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowTransactionsService.remove(+id);
  }
}
