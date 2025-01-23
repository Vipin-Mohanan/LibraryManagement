/* eslint-disable prettier/prettier */

import { IsNumber,IsString } from "class-validator";

export class CreateBookDto {

    @IsNumber()
     book_id:BigInteger;

    @IsString()
     title: string;

     @IsString()
     author: string
    
     @IsString()
     publisher: string

     @IsString()
     publication_year: string ;
        
     @IsNumber()
     isbn: BigInteger;
    
     @IsNumber()
     category_id :BigInteger;
    
     @IsNumber()
     copies_available: number;

     @IsNumber()
     total_copies: number;

}
