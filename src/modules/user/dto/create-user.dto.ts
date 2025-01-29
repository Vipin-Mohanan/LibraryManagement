/* eslint-disable prettier/prettier */
import {  IsNumber, IsString } from "class-validator"
export class CreateUserDto {
    

    @IsString()
    name:string

    @IsString()
    email:string

    @IsString()
    password:string

    @IsString()
    confirmPassword:string

    @IsNumber()
    phone_number:number

    @IsString()
    address:string


}


