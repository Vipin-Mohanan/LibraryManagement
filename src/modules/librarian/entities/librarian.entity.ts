/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum } from "class-validator";
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";
import { librarianRole } from "../dto/create-librarian.dto";

@Entity()
export class Librarian {
        @PrimaryGeneratedColumn()
        librarian_id?:number
    
        @IsEmpty()
        @Column()
        name?:string
    
        @IsEmpty()
        @Column()
        email?:string
    
        @IsEmpty()
        @Column()
        phone_number?:number

        @IsEmpty()
        @Column()
        password?:string

    
        @IsEmpty()
        @Column()
        address?:string
    
        @IsEmpty()
        @Column(
                {
                        type:'enum',
                        enum:librarianRole,
                        default:librarianRole.Librarian
                }
        )
        @IsEnum(librarianRole)
        role:librarianRole
}
