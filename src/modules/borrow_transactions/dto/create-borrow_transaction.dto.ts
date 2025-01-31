/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateBorrowTransactionDto {


  
    @IsNumber()
    book_id :number

    @IsNumber()
    user_id :number

    @IsOptional()
    borrow_date:string | null;

    @IsOptional()
    due_date:string | null;

    @IsString()
    status:string

    @IsOptional() // Allows return_date to be omitted or set as null
    return_date?: string | null;


}
