/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import {  IsNumber, IsString } from "class-validator"
export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password:string

    @ApiProperty()
    @IsString()
    confirmPassword:string

    @ApiProperty()
    @IsNumber()
    phone_number:number

    @ApiProperty()
    @IsString()
    address:string


}


