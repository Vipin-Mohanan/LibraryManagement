/* eslint-disable prettier/prettier */
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateAuditLogDto {


        @IsNumber()
        log_id :number;
    
        @IsString()
        action_performed:string;
    
        @IsNumber()
        user_id:number;
    
        @IsDate()I
        timestamp:Date;
}
