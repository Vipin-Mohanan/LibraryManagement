/* eslint-disable prettier/prettier */

import { IsNumber,IsString } from "class-validator";


export class CreateBookDto {

    @IsNumber()
     book_id:number;

    @IsString()
     title: string;

     @IsString()
     author: string
    
     @IsString()
     publisher: string

     @IsString()
     publication_year: string ;
        
     @IsNumber()
     isbn: number;
    
     @IsNumber()
     category_id :number;
    
     @IsNumber()
     copies_available: number;

     @IsNumber()
     total_copies: number;

}
