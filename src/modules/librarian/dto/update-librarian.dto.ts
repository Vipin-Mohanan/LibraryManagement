/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateLibrarianDto, librarianRole } from './create-librarian.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLibrarianDto extends PartialType(CreateLibrarianDto) {
        
    
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
        @IsString()
        password:string
    
        @IsOptional()
        @IsEnum(librarianRole)
        role:librarianRole
}
