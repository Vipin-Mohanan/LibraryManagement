/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import {  IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';


export class UpdateBookDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    author: string;

    
    @IsOptional()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsString()
    publisher: string;
  
    @IsOptional()
    @IsString()
    publication_year: string;
  
    @IsOptional()
    @IsString()
    isbn: string;
  
    @IsOptional()
    @IsNumber()
    category_id: number;
  
    @IsOptional()
    @IsNumber()
    copies_available: number;
  
    @IsOptional()
    @IsNumber()
    total_copies: number;

    @IsOptional()
    @IsArray()
    images?: Buffer[]; // Accept multiple binary image files

}
