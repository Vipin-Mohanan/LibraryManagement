/* eslint-disable prettier/prettier */
import { IsDate, IsNumber } from 'class-validator';
import { IntegerType } from 'typeorm';
/* eslint-disable prettier/prettier */
export class CreateBorrowTransactionDto {


    @IsNumber()
    transaction_id:IntegerType

    @IsNumber()
    book_id :IntegerType

    @IsNumber()
    user_id :IntegerType

    @IsDate()
    borrow_date:Date

    @IsDate()
    due_date:Date

    @IsDate()
    return_date:Date

    @IsDate()
    status:string


}
