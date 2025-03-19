/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateBorrowTransactionDto {


    @ApiProperty()
    @IsNumber()
    book_id :number

    @ApiProperty()
    @IsNumber()
    user_id :number

    @ApiProperty() 
    @IsOptional()
    borrow_date:string | null;

    @ApiProperty()
    @IsOptional()
    due_date:string | null;

    @ApiProperty()
    @IsString()
    status:string

    @ApiProperty()
    @IsOptional() // Allows return_date to be omitted or set as null
    return_date?: string | null;


}
