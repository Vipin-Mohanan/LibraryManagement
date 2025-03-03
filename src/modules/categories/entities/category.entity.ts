/* eslint-disable prettier/prettier */

// import { Book } from "src/modules/books/entities/book.entity";
import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../../books/entities/book.entity';


@Entity()
export class Category {

   @PrimaryGeneratedColumn({name:"category_id"})
    category_id : number;

    @Column()
    category_name: string;


     // Define the One-to-Many relationship with Book
     @OneToMany(() => Book, (book) => book.category)
     books?: Book[];

     
}