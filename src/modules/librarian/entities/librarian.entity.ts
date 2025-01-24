/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { Column, Entity, IntegerType, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Librarian {
        @PrimaryGeneratedColumn()
        librarian_id:IntegerType
    
        @IsEmpty()
        @Column()
        name:string
    
        @IsEmpty()
        @Column()
        email:string
    
        @IsEmpty()
        @Column()
        phone_number:number
    
        @IsEmpty()
        @Column()
        address:string
    
        @IsEmpty()
        @Column()
        role:boolean
}
