/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateReservationDto {

@IsNumber()
reservation_id :number

@IsNumber()
book_id :number

@IsNumber()
member_id :number

@IsDate()
reservation_date: Date

@IsString()
status: string

}
