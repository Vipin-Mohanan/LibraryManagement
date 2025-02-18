/* eslint-disable prettier/prettier */

import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateBookDto {


    @IsString()
     title: string;

     @IsString()
     author: string
     
     @IsString()
     description:string
    
     @IsString()
     publisher?: string

     @Transform(({value})=>Number(value))
     @IsNumber()
     publication_year: number ;
        
     @IsString()
     isbn: string;
    
     @Transform(({value})=>Number(value))
     @IsNumber()
     category_id :number;
    
     @Transform(({value})=>Number(value))
     @IsNumber()
     copies_available: number;

     @Transform(({value})=>Number(value))
     @IsNumber()
     total_copies: number;

    @IsArray()
    @IsOptional()
    images?: Buffer[]; // Accept multiple binary image files
    
    }

