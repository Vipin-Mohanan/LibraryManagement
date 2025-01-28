/* eslint-disable prettier/prettier */
import { IsDate, IsNumber } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateBorrowTransactionDto {


    @IsNumber()
    transaction_id:number

    @IsNumber()
    book_id :number

    @IsNumber()
    user_id :number

    @IsDate()
    borrow_date:Date

    @IsDate()
    due_date:Date

    @IsDate()
    return_date:Date

    @IsDate()
    status:string


}
