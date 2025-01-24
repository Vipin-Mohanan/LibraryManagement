/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateLibrarianDto {

    @IsNumber()
    librarian_id:number

    @IsString()
    name:string

    @IsString()
    email:string

    @IsNumber()
    phone_number:number

    @IsString()
    address:string

    @IsBoolean()
    role:boolean

}


