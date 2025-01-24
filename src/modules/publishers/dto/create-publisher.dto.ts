/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator"

export class CreatePublisherDto {

    @IsNumber()
    publisher_id:number

    @IsString()
    name:string

    @IsString()
    address:string

    @IsNumber()
    phone_number:number
}


