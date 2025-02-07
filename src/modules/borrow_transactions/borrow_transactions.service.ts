/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowTransaction } from './entities/borrow_transaction.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { User } from '../user/entities/user.entity';
import { addDays } from 'date-fns';

@Injectable()
export class BorrowTransactionsService {
  constructor(
    @InjectRepository(BorrowTransaction)
    private readonly borrowRep: Repository<BorrowTransaction>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async borrowBook(borrowDto: CreateBorrowTransactionDto) {
    console.log(borrowDto);
    try {
      const { user_id, book_id, status } = borrowDto;
      //due date
      const borrowDate = new Date();
      const dueDate = addDays(borrowDate, 14);

      const book_data = await this.bookRepo.findOne({
        where: { book_id: book_id },
      });
      if (!book_data || book_data.copies_available < 1) {
        throw new Error('Book is not available for borrowing');
      }

      // Fetch the user details using user_id
      const user_data = await this.UserRepo.findOne({ where: { user_id } });
      if (!user_data) {
        throw new Error('User not found');
      }

      // const alreadyBorrowed = await this.borrowRep.find({
      //   where: {
      //     books: { book_id: book_id },
      //     return_date: null,
      //   },
      //   relations: ['books'],
      // });


      const alreadyBorrowed = await this.borrowRep.createQueryBuilder('borrowTransaction')
      .innerJoin('borrowTransaction.books', 'books')
      .innerJoin('borrowTransaction.user', 'user')
      .where('books.book_id = :book_id', { book_id })
      .andWhere('user.user_id = :user_id', { user_id })
      .andWhere('borrowTransaction.return_date IS NULL') // Book is not returned
      .andWhere('borrowTransaction.status = :status', { status: "borrowed" }) // Status is "borrowed"
      .getOne();
  



      // console.log("already",alreadyBorrowed);

      const isBorrowed = !!alreadyBorrowed;  // Convert to boolean
      if (isBorrowed) {
        throw new Error('Could not fetch book');
          
      } else {
          console.log("The book is available for borrowing.");
      }


        const borrow = await this.borrowRep.create({
          status: status,
          due_date: dueDate,
          books: book_data,
          user: user_data,
        });

        await this.borrowRep.save(borrow);

        book_data.copies_available -= 1;
        const borrowedBook = await this.bookRepo.save(book_data);

        return {
          status: 'success',
          data: borrowedBook,
        };
      
    } catch (error) {
      console.error('error fetching book', error);
      throw new Error('Could not fetch book');
    }
  }

  async borrowBookDetails(user_id: number) {
    const borrowedBooks = await this.borrowRep
      .createQueryBuilder('borrowTransaction')
      .innerJoin('borrowTransaction.user', 'user')
      .innerJoinAndSelect('borrowTransaction.books', 'books')
      .where('borrowTransaction.return_date IS NULL')
      .andWhere('borrowTransaction.user_id = :user_id', { user_id })
      .getMany();
    return {
      status: 'success',
      data: borrowedBooks,
    };
  }
}
