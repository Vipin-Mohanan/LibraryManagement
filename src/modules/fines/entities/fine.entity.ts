/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fine {

        @PrimaryGeneratedColumn()
        fine_id:IntegerType
    
        @IsEmpty()
        @Column()
        transaction_id:number
    
        @IsEmpty()
        @Column()
        fine_amount:number
    
        @IsEmpty()
        @Column()
        payment_status:boolean
    
        @IsEmpty()
        @Column()
        fine_date:Date
}
