/* eslint-disable prettier/prettier */

import { IsEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Book {

       @PrimaryGeneratedColumn()
        book_id:BigInteger

        @IsEmpty()
        @Column()
        title: string
        
        @IsEmpty()
        @Column()
        author: string

        @IsEmpty()
        @Column()
        publisher: string

        @IsEmpty()
        @Column()
        publication_year: string 

        @IsEmpty()
        @Column()
        isbn: number

        @IsEmpty()
        @Column()
        category_id :BigInteger

        @IsEmpty()
        @Column()
        copies_available: number

        @IsEmpty()
        @Column()
        total_copies: number
}


        // category_id (Foreign Key): Links to the Categories table.
