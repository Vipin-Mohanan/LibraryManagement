/* eslint-disable prettier/prettier */

import { Book } from "src/modules/books/entities/book.entity";
import { Column, Entity, IntegerType, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

   @PrimaryGeneratedColumn({name:"category_id"})
    category_id : number;

    @Column()
    category_name: string;


     // Define the One-to-Many relationship with Book
     @OneToMany(() => Book, (book) => book.category)
     books: Book[];

     
}