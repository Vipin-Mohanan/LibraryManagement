/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Librarian {
        @PrimaryGeneratedColumn()
        librarian_id:number
    
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
