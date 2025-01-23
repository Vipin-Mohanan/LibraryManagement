/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { IntegerType } from 'typeorm';

export class UpdateBookDto extends PartialType(CreateBookDto) {

        @Optional()
        @IsNumber()
        book_id:IntegerType;
    
        @Optional()
        @IsString()
         title: string;
    
         @Optional()
         @IsString()
         author: string
        
         @Optional()
         @IsString()
         publisher: string
    
         @Optional()
         @IsString()
         publication_year: string ;
            
         @Optional()
         @IsNumber()
         isbn: IntegerType;
        
         @Optional()
         @IsNumber()
         category_id :IntegerType;
        
         @Optional()
         @IsNumber()
         copies_available: number;
    
         @Optional()
         @IsNumber()
         total_copies: number;
    
}
