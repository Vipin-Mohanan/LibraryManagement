/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        user_id:IntegerType
    
        @Column()
        @IsEmpty()
        name:string
    
        @Column()
        @IsEmpty()
        email:string
    
        @Column()
        @IsEmpty()
        phone_number:number
    
        @Column()
        @IsEmpty()
        address:string
    
        @Column()
        @IsEmpty()
        membership_date:Date
    
        @Column()
        @IsEmpty()
        membership_status:boolean
   
}
