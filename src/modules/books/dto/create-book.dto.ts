/* eslint-disable prettier/prettier */

import { IsArray, IsNumber,IsOptional,IsString } from "class-validator";


export class CreateBookDto {


    @IsString()
     title: string;

     @IsString()
     author: string
    
     @IsString()
     publisher: string

     @IsString()
     publication_year: string ;
        
     @IsString()
     isbn: string;
    
     @IsNumber()
     category_id :number;
    
     @IsNumber()
     copies_available: number;

     @IsNumber()
     total_copies: number;

    @IsArray()
    images?: Buffer[]; // Accept multiple binary image files
    
    }

