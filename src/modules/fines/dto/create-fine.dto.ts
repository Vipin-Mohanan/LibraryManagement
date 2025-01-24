/* eslint-disable prettier/prettier */

import { IsBoolean, IsDate, IsNumber } from "class-validator"

export class CreateFineDto {

    @IsNumber()
    fine_id:number

    @IsNumber()
    transaction_id:number

    @IsNumber()
    fine_amount:number

    @IsBoolean()
    payment_status:boolean

    @IsDate()
    fine_date:Date
}



