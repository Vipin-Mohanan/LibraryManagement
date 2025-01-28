/* eslint-disable prettier/prettier */
import { IsEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher {

        @PrimaryGeneratedColumn()
        publisher_id:number
    
        @IsEmpty()
        @Column()
        name:string
    
        @IsEmpty()
        @Column()
        address:string
    
        @IsEmpty()
        @Column()
        phone_number:number

}
