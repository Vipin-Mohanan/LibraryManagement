import { IsEmail, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateAuthDto {
    
    @IsEmail()
    email:string

    @IsString()
    password:string
}
