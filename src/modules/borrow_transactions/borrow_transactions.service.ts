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
  
   constructor(@InjectRepository(BorrowTransaction) private readonly borrowRep : Repository<BorrowTransaction>,
               @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
               @InjectRepository(User) private readonly UserRepo: Repository<User>){}

    async borrowBook(borrowDto:CreateBorrowTransactionDto){
       console.log(borrowDto)
        try{

          const {user_id,book_id,status} = borrowDto
          //due date
          const borrowDate = new Date();
          const dueDate = addDays(borrowDate,14)
          
          const book_data = await this.bookRepo.findOne({where:{book_id:book_id}})
          if (!book_data || book_data.copies_available < 1) {
            throw new Error('Book is not available for borrowing');
          }


      // Fetch the user details using user_id
      const user_data = await this.UserRepo.findOne({ where: { user_id } });
      if (!user_data) {
          throw new Error('User not found');
      }


        const borrow = await this.borrowRep.create({
          status: status,
          due_date:dueDate,
          books: book_data,          
          user: user_data,
        })


        await this.borrowRep.save(borrow)
      

        book_data.copies_available -= 1;
        await this.bookRepo.save(book_data);


          
        }catch(error)
        {
            console.error('error fetching book', error);
            throw new Error('Could not fetch book');    
        }
          
    }

 
    async borrowBookDetails(user_id: number) {
      const borrowedBooks = await this.borrowRep.createQueryBuilder('borrowTransaction')
          .innerJoinAndSelect('borrowTransaction.user', 'user')
          .innerJoinAndSelect('borrowTransaction.books', 'books') 
          .where('borrowTransaction.return_date IS NULL')
          .andWhere('borrowTransaction.user_id = :user_id', { user_id }) 
          .getMany(); 
      return  ({
        status:"success",
        data:borrowedBooks});
  }
  
    }


