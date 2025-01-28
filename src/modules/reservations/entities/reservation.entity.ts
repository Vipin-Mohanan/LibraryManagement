/* eslint-disable prettier/prettier */
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  
  @ManyToOne(() => Book, (book) => book.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  books:Book[]

  @ManyToOne(() => User, (user) => user.reservation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users:User[]

  @Column()
  reservation_date: Date;

  @Column()
  status: string;
}
