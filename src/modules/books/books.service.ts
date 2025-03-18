import { Injectable} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import * as fs from 'fs';
import { BookNotFoundError, CategoryNotFoundError } from 'src/filters/errorMessage';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async addBook(bookDto: CreateBookDto,images: Buffer[]) {
   

   try {
    const {category_id} =bookDto; 
     
    const category = await this.categoryRepo.findOne({where:{category_id:category_id}})

    if(!category){
      CategoryNotFoundError()
    }

   const bookData = this.bookRepo.create({
      title:bookDto.title,
      author:bookDto.author,
      description:bookDto.description,
      publisher:bookDto.publisher,
      publication_year:bookDto.publication_year,
      isbn:bookDto.isbn,
      category:category,
      copies_available:bookDto.copies_available,
      total_copies:bookDto.total_copies,
      images:images
    })
    
    await this.bookRepo.save(bookData)
    return bookData
  
   } catch (error) {
    throw error
   }
  }

  async getAllBooks() {
 
      const books = await this.bookRepo.find();

      if(books.length===0){
        BookNotFoundError()      
      }

      return books;
      
  }

  async getBooksById(id: number) {
    
      const book = await this.bookRepo.findOne({
        where: { book_id: id },
        relations: ['category'],
      });

      if (!book) {
        BookNotFoundError()  
      }
      return book; 

  }

  async searchBook(query: string) {
    
      const book = await this.bookRepo
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.category', 'category') // join the category table
        .where('book.title ILIKE :query', { query: `%${query}%` }) // search by book title
        .orWhere('book.author ILIKE :query', { query: `%${query}%` }) // search by book author
        .orWhere('book.isbn ILIKE :query', { query: `%${query}%` })
        .orWhere('category.category_name ILIKE :query', { query: `%${query}%` }) // search by category name
        .getMany();

      if (book.length===0) {
        BookNotFoundError()   
      }

      return book;
    
  }

  async editBookDetails(id: number,bookDto: UpdateBookDto,images: Express.Multer.File[],)
   {
      const book = await this.bookRepo.findOne({ where: { book_id: id } });

      if (!book) {

      }

      if (images && images.length > 0) {
        book.images = await Promise.all(
          images.map(async (file) => {
            // Read the file as a buffer
            const fileBuffer = fs.readFileSync(file.path); // Read the image file as a buffer
            return fileBuffer;
          }),
        );
      }


      //  Update book details
      const updatedBook = Object.assign(book, bookDto);
      await this.bookRepo.save(updatedBook);
      

      return updatedBook;
      
}

  async getAllBooksByCategory(id: number) {
      const books = await this.bookRepo.find({
        where: { category: { category_id: id } },
        relations: ['category'],
      });

      if (!books) {
        BookNotFoundError()       
        }

      return books;

  }

  async getAllBooksCategorywise() {

      const books = await this.bookRepo
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.category', 'category')
        .orderBy('category.category_name', 'ASC')
        .getMany();

      if (books.length==0) {
        BookNotFoundError()  
             }

      const categorizedBooks = books.reduce((acc, book) => {
        const categoryName = book.category.category_name;

        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(book);

        return acc; 
      }, {}); 

      const categorizedBooksArray = Object.entries(categorizedBooks).map(
        ([category, books]) => ({
          category,
          books,
        }),
      );
      return categorizedBooksArray;
 
  }
}
