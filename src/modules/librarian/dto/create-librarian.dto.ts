/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator"

export enum librarianRole{
    Librarian = 'librarian',
    Admin = 'admin'
}

export class CreateLibrarianDto {

 
    @ApiProperty()
    @IsString()
    name?:string

    @ApiProperty()
    @IsEmail()
    email?:string

    @ApiProperty()
    @IsNumber()
    phone_number?:number

    @ApiProperty()
    @IsString()
    address?:string

    @ApiProperty()
    @IsString()
    password?:string


    @ApiProperty()
    @IsString()
    confirmPassword?:string

    @ApiProperty()
    @IsEnum(librarianRole)
    role?:librarianRole

}


