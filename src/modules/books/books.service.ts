/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { UpdateBookDto } from './dto/update-book.dto';



@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async addBook(bookDto: CreateBookDto,images: Buffer[]) {
    console.log(bookDto);

    const {category_id} =bookDto; 
     // const { category_id, ...bookData } = bookDto;
     //we are saving instance

    const category = await this.categoryRepo.findOne({where:{category_id:category_id}})
    if(!category){
      console.log("not found")
    }

   const bookData =  this.bookRepo.create({
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

   // const newBook = this.bookRepo.create({ ...bookData, category });
    console.log(images)
    console.log("Book Data: ", bookData);
    
    this.bookRepo.save(bookData)
    return ({
      status:"Success",
      data:bookData
    })
  }

  async getAllBooks(){
    try {
      const books = await this.bookRepo.find();
      return ({
        status:"Success",
        data:books
      })
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Could not fetch books');
    }
  }

  async getBooksById(id: number){
    try {
      const book = await this.bookRepo.findOne({ where: { book_id: id } });

      return ({
        status: "success",
        data:book
        });
    } catch (error) {
      console.error('error fetching book', error);
      throw new Error('Could not fetch book');
    }
  }

  async searchBook(query :string){
    try{

    const book = await this.bookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category') // join the category table
      .where('book.title ILIKE :query', { query: `%${query}%` }) // search by book title
      .orWhere('book.author ILIKE :query', { query: `%${query}%` }) // search by book author
      .orWhere('book.isbn ILIKE :query', { query : `%${query}%`})
      .orWhere('category.category_name ILIKE :query', { query: `%${query}%` }) // search by category name
      .getMany();

      return ({
        status: "success",
        data:book
        });

    }catch(error){
      console.error('error fetching book', error);
      throw new Error('Could not fetch book');    }
  }

  async editBookDetails(id:number,bookdto:UpdateBookDto){
    try{
       const book = await this.bookRepo.findOne({where:{book_id:id}});
       if(!book){
        throw new Error('book not found')
       }
        const updatedBook = Object.assign(book,bookdto)
       await this.bookRepo.save(updatedBook)
       return ({
        status: "success",
        data:updatedBook
        });

    }
    catch(error){
      console.error('cannot update book details',error);
      throw new Error('could not update');
    }
  }


  async getAllBooksByCategory(id:number){
    try {
      const books = await this.bookRepo.find({
        where: { category: { category_id:id } }, 
        relations: ['category']  
      });     
      
      return ({
        status: "success",
        data:books
        });
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Could not fetch books');
    }
  }
}
