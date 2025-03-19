/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateBorrowTransactionDto {


    @ApiProperty()
    @ApiProperty()
    @IsNumber()
    book_id :number

    @ApiProperty()
    @ApiProperty()
    @IsNumber()
    user_id :number

    @ApiProperty()
    @IsOptional()
    borrow_date:string | null;

    @ApiProperty()
    @ApiProperty()
    @IsOptional()
    due_date:string | null;

    @ApiProperty()
    @ApiProperty()
    @IsString()
    status:string

    @ApiProperty()
    @ApiProperty()
    @IsOptional() // Allows return_date to be omitted or set as null
    return_date?: string | null;


}
