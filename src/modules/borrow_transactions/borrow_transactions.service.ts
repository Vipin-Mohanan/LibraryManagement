import { Injectable } from '@nestjs/common';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { UpdateBorrowTransactionDto } from './dto/update-borrow_transaction.dto';

@Injectable()
export class BorrowTransactionsService {
  create(createBorrowTransactionDto: CreateBorrowTransactionDto) {
    return 'This action adds a new borrowTransaction';
  }

  findAll() {
    return `This action returns all borrowTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowTransaction`;
  }

  update(id: number, updateBorrowTransactionDto: UpdateBorrowTransactionDto) {
    return `This action updates a #${id} borrowTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrowTransaction`;
  }
}
