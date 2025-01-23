/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateBookDto extends PartialType(CreateBookDto) {

        @Optional()
        @IsNumber()
         book_id:BigInteger;
    
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
         isbn: BigInteger;
        
         @Optional()
         @IsNumber()
         category_id :BigInteger;
        
         @Optional()
         @IsNumber()
         copies_available: number;
    
         @Optional()
         @IsNumber()
         total_copies: number;
    
}
