/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

        @IsOptional()
        @IsNumber()
        user_id:number
    
        @IsOptional()
        @IsString()
        name:string
    
        @IsOptional()
        @IsString()
        email:string
    
        @IsOptional()
        @IsNumber()
        phone_number:number
    
        @IsOptional()
        @IsString()
        address:string
    
        @IsOptional()
        @IsDate()
        membership_date:Date
    
        @IsOptional()
        @IsBoolean()
        membership_status:boolean
}
