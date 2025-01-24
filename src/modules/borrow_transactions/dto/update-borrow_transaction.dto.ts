/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowTransactionDto } from './create-borrow_transaction.dto';

export class UpdateBorrowTransactionDto extends PartialType(CreateBorrowTransactionDto) {}
