/* eslint-disable prettier/prettier */

import { IsNumber,IsString } from "class-validator";
import { IntegerType } from "typeorm";

export class CreateBookDto {

    @IsNumber()
     book_id:IntegerType;

    @IsString()
     title: string;

     @IsString()
     author: string
    
     @IsString()
     publisher: string

     @IsString()
     publication_year: string ;
        
     @IsNumber()
     isbn: IntegerType;
    
     @IsNumber()
     category_id :IntegerType;
    
     @IsNumber()
     copies_available: number;

     @IsNumber()
     total_copies: number;

}
