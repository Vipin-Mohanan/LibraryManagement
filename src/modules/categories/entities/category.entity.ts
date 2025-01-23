/* eslint-disable prettier/prettier */

import { IsEmpty, IsNumber, IsString } from "class-validator";





export class Category {

    @IsNumber()
    @IsEmpty()
    category_id : bigint;

    @IsEmpty()
    @IsString()
    category_name: string;
}