/* eslint-disable prettier/prettier */


import { Column, Entity, IntegerType, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Book {

       @PrimaryGeneratedColumn()
        book_id:IntegerType


        @Column()
        title: string
        
      
        @Column()
        author: string

   
        @Column()
        publisher: string

       
        @Column()
        publication_year: string 


        @Column()
        isbn: IntegerType

      
        @Column()
        category_id :IntegerType

       
        @Column()
        copies_available: IntegerType

       
        @Column()
        total_copies: IntegerType
}


        // category_id (Foreign Key): Links to the Categories table.
