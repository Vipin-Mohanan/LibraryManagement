/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowTransaction } from './entities/borrow_transaction.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { User } from '../user/entities/user.entity';
import { addDays } from 'date-fns';
import {
  BookNotBorrowError,
  BorrowLogNotAvailableError,
  UserNotFoundError,
} from 'src/filters/errorMessage';

@Injectable()
export class BorrowTransactionsService {
  constructor(
    @InjectRepository(BorrowTransaction)
    private readonly borrowRep: Repository<BorrowTransaction>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}



  /**
   * Allows a user to borrow a book if it's available.
   * 
   * @param {CreateBorrowTransactionDto} borrowDto - The borrowing request containing user ID, book ID, and status.
   * @returns {Promise<Book>} The borrowed book data with updated availability.
   * @throws {BookNotBorrowError} If the book is unavailable or the user has already borrowed it.
   * @throws {UserNotFoundError} If the user does not exist.
   */
  async borrowBook(borrowDto: CreateBorrowTransactionDto) {
    const { user_id, book_id, status } = borrowDto;
    //due date
    const borrowDate = new Date();
    const dueDate = addDays(borrowDate, 14);

    const book_data = await this.bookRepo.findOne({
      where: { book_id: book_id },
    });
    if (!book_data || book_data.copies_available < 1) {
      BookNotBorrowError();
    }

    // Fetch the user details using user_id
    const user_data = await this.UserRepo.findOne({ where: { user_id } });
    if (!user_data) {
      UserNotFoundError();
    }

    const alreadyBorrowed = await this.borrowRep
      .createQueryBuilder('borrowTransaction')
      .innerJoin('borrowTransaction.books', 'books')
      .innerJoin('borrowTransaction.user', 'user')
      .where('books.book_id = :book_id', { book_id })
      .andWhere('user.user_id = :user_id', { user_id })
      .andWhere('borrowTransaction.return_date IS NULL') // Book is not returned
      .andWhere('borrowTransaction.status = :status', { status: 'borrowed' }) // Status is "borrowed"
      .getOne();

    const isBorrowed = !!alreadyBorrowed; // Convert to boolean
    if (isBorrowed) {
      BookNotBorrowError();
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
    return borrowedBook;
  }

   /**
   * Retrieves details of borrowed books for a specific user.
   * 
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<BorrowTransaction[]>} The list of borrowed books.
   * @throws {BorrowLogNotAvailableError} If no borrowed books are found for the user.
   */

  async borrowBookDetails(user_id: number) {
    const borrowedBooks = await this.borrowRep
      .createQueryBuilder('borrowTransaction')
      .innerJoin('borrowTransaction.user', 'user')
      .innerJoinAndSelect('borrowTransaction.books', 'books')
      .where('borrowTransaction.return_date IS NULL')
      .andWhere('borrowTransaction.user_id = :user_id', { user_id })
      .getMany();

    if (!borrowedBooks) {
      BorrowLogNotAvailableError();
    }

    return borrowedBooks;
  }


   /**
   * Updates the status of a returned book and increases its available copies.
   * 
   * @param {number} user_id - The ID of the user returning the book.
   * @param {number} book_id - The ID of the book being returned.
   * @returns {Promise<BorrowTransaction>} The updated borrow transaction data.
   * @throws {BorrowLogNotAvailableError} If no active borrow transaction is found for the given user and book.
   */

  async updateReturnedBook(user_id: number, book_id: number) {
    const bookData = await this.bookRepo.findOne({
      where: {
        book_id: book_id,
      },
    });

    const borrowLog = await this.borrowRep.findOne({
      where: {
        user: { user_id: user_id },
        books: { book_id: book_id },
      },
      relations: ['user', 'books'],
    });

    if (!borrowLog) {
      BorrowLogNotAvailableError();
    }

    borrowLog.status = 'returned';
    borrowLog.return_date = new Date();

    const updatedBook = await this.borrowRep.save(borrowLog);

    bookData.copies_available += 1;

    await this.bookRepo.save(bookData);
    return updatedBook;
  }
}
