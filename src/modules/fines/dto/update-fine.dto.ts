/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFineDto } from './create-fine.dto';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateFineDto extends PartialType(CreateFineDto) {

        @IsOptional()
        @IsNumber()
        fine_id:number
    
        @IsOptional()
        @IsNumber()
        transaction_id:number
    
        @IsOptional()
        @IsNumber()
        fine_amount:number
    
        @IsOptional()
        @IsBoolean()
        payment_status:boolean
    
        @IsOptional()
        @IsDate()
        fine_date:Date
}
