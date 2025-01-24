/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePublisherDto } from './create-publisher.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {

        @IsOptional()
        @IsNumber()
        publisher_id:number
    
        @IsOptional()
        @IsString()
        name:string
    
        @IsOptional()
        @IsString()
        address:string
    
        @IsOptional()
        @IsNumber()
        phone_number:number
}
