/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator"

export enum librarianRole{
    Librarian = 'librarian',
    Admin = 'admin'
}

export class CreateLibrarianDto {

 

    @IsString()
    name?:string

    @IsEmail()
    email?:string

    @IsNumber()
    phone_number?:number

    @IsString()
    address?:string

    @IsString()
    password?:string

    @IsString()
    confirmPassword?:string

    @IsEnum(librarianRole)
    role?:librarianRole

}


