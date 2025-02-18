/* eslint-disable prettier/prettier */
import { BorrowTransaction } from "../../borrow_transactions/entities/borrow_transaction.entity";

// import { BorrowTransaction } from "src/modules/borrow_transactions/entities/borrow_transaction.entity";
import { Category } from "../../categories/entities/category.entity";
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn({ name: "book_id" })
  book_id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description:string;

  @Column()
  publisher: string;

  @Column()
  publication_year: number;

  @Column()
  isbn: string; // Changed to string for better compatibility with ISBN formats

  // Define the Many-to-One relationship with Category
  @ManyToOne(() => Category, (category) => category.books, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" }) // Maps the foreign key column
  category: Category;

  @Column({ name: "copies_available", type: "int" })
  copies_available: number; 

  @Column({ name: "total_copies", type: "int" })
  total_copies: number;

//image

@Column("bytea", { array: true, nullable: true }) // Store multiple images as binary (bytea)
images: Buffer[]; 

  // Define the One-to-Many relationship with BorrowTransaction
  @OneToMany(() => BorrowTransaction, (borrowTransaction) => borrowTransaction.books)
  borrowTransactions: BorrowTransaction[];

  // Define the One-to-Many relationship with Reservation
  @OneToMany(() => Reservation, (reservation) => reservation.books)
  reservations: Reservation[];
}
