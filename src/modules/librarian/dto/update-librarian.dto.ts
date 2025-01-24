/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLibrarianDto } from './create-librarian.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLibrarianDto extends PartialType(CreateLibrarianDto) {
        @IsOptional()
        @IsNumber()
        librarian_id:number
    
        @IsOptional()
        @IsString()
        name:string
    
        @IsOptional()
        @IsString()
        email:string
    
        @IsOptional()
        @IsNumber()
        phone_number:number
    
        @IsOptional()
        @IsString()
        address:string
    
        @IsOptional()
        @IsBoolean()
        role:boolean
}
