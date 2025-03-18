/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateBookDto {

    @ApiProperty()
    @IsString()
     title: string;

     @ApiProperty()
     @IsString()
     author: string
     
     @ApiProperty()
     @IsString()
     description:string
    
     @ApiProperty()
     @IsString()
     publisher?: string

     @ApiProperty()
     @Transform(({value})=>Number(value))
     @IsNumber()
     publication_year: number ;
        
     @ApiProperty()
     @IsString()
     isbn: string;
    
     @ApiProperty()
     @Transform(({value})=>Number(value))
     @IsNumber()
     category_id :number;
    
     @ApiProperty()
     @Transform(({value})=>Number(value))
     @IsNumber()
     copies_available: number;

     @ApiProperty()
     @Transform(({value})=>Number(value))
     @IsNumber()
     total_copies: number;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    images?: Buffer[]; // Accept multiple binary image files
    
    }

