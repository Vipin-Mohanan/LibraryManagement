/* eslint-disable prettier/prettier */
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator"
export class CreateUserDto {
    
    @IsNumber()
    user_id:number

    @IsString()
    name:string

    @IsString()
    email:string

    @IsNumber()
    phone_number:number

    @IsString()
    address:string

    @IsDate()
    membership_date:Date

    @IsBoolean()
    membership_status:boolean
}


