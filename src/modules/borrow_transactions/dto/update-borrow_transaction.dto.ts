/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowTransactionDto } from './create-borrow_transaction.dto';
import { IsOptional } from 'class-validator';

export class UpdateBorrowTransactionDto extends PartialType(CreateBorrowTransactionDto) {

        @IsOptional()
        book_id :number
    
        @IsOptional()
        user_id :number
    
        @IsOptional()
        borrow_date:string | null;
    
        @IsOptional()
        due_date:string | null;
    
        @IsOptional()
        status:string
    
        @IsOptional() // Allows return_date to be omitted or set as null
        return_date?: string | null;
}
