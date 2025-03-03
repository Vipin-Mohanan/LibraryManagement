/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';


describe('BooksService', () => {
  let bookService: BooksService;
  let bookRepo:Repository<Book>;
  let categoryRepo:Repository<Category>;

  const mockCategory = {category_id:1, category_name:'Action'} as Category

  const bookDto={
    book_id:1,
    title: "ABC",
    author: "XYZ",
    description:"A short description",
    publisher: "XYZ",
    publication_year: 1988,
    isbn: "ISBN00001",
    category_id :1,
    copies_available:10,
    total_copies:15,
    images:[],
    borrowTransactions:[], 
    reservations:[]
}

const books=[
  { book_id:1,title: "ABC",author: "XYZ",description:"A short description",publisher: "XYZ",publication_year: 1988,isbn: "ISBN00001",category:mockCategory,copies_available:10,total_copies:15,images:[],borrowTransactions:[], reservations:[]},
  { book_id:2,title: "ABC",author: "XYZ",description:"A short description",publisher: "XYZ",publication_year: 1988,isbn: "ISBN00001",category:mockCategory,copies_available:10,total_copies:15,images:[],borrowTransactions:[], reservations:[]},
  { book_id:3,title: "ABC",author: "XYZ",description:"A short description",publisher: "XYZ",publication_year: 1988,isbn: "ISBN00001",category:mockCategory,copies_available:10,total_copies:15,images:[],borrowTransactions:[], reservations:[]},
  { book_id:4,title: "ABC",author: "XYZ",description:"A short description",publisher: "XYZ",publication_year: 1988,isbn: "ISBN00001",category:mockCategory,copies_available:10,total_copies:15,images:[],borrowTransactions:[], reservations:[]},
  { book_id:5,title: "ABC",author: "XYZ",description:"A short description",publisher: "XYZ",publication_year: 1988,isbn: "ISBN00001",category:mockCategory,copies_available:10,total_copies:15,images:[],borrowTransactions:[], reservations:[]},
]


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
        {
          provide:getRepositoryToken(Book),
          useValue:{
              save: jest.fn(),
              create: jest.fn(),
              find:jest.fn(),
              findOne:jest.fn()
          }
        },

        {
          provide:getRepositoryToken(Category),
          useValue:{
              findOne:jest.fn()
          }
        }
      ],
     
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
    categoryRepo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });


  it('should throw an error if the category is empty',()=>{

    jest.spyOn(categoryRepo, 'findOne').mockResolvedValue(null);

    expect(bookService.addBook(bookDto, [])).rejects.toThrow(NotFoundException);

  });


  it('should successfully add a book if the category is matching', async () => {

    const expectedBook = {
      ...bookDto,
      category:mockCategory
    }

    jest.spyOn(categoryRepo, 'findOne').mockResolvedValue(mockCategory);
    jest.spyOn(bookRepo, 'create').mockReturnValue(expectedBook as Book);
    jest.spyOn(bookRepo, 'save').mockResolvedValue(expectedBook as Book);

    const result = await bookService.addBook(bookDto, [])

    const category = await categoryRepo.findOne({where:{category_id:mockCategory.category_id}});
    expect(category).toEqual(mockCategory);
     
    expect(bookRepo.create).toHaveBeenCalledWith(expect.objectContaining({
     author: "XYZ", 
     category: mockCategory, 
     copies_available: 10, 
     description: "A short description", 
     images: [],
     isbn: "ISBN00001", 
     publication_year: 1988, 
     publisher: "XYZ",  
     title: "ABC", 
     total_copies: 15
    }))

    expect(bookRepo.save).toHaveBeenCalledWith(expectedBook)

    expect(result).toEqual({
      status: "Success",
      data: expectedBook,
  });
  });

  it('throw an exception if no books are found',async()=>{

    jest.spyOn(bookRepo, 'find').mockResolvedValue([]);

    await expect(bookService.getAllBooks()).rejects.toThrow(NotFoundException);
  });

  it('return all books if they are present', async()=>{

    jest.spyOn(bookRepo, 'find').mockResolvedValue(books)

    const result = await bookService.getAllBooks();

    expect(result).toEqual({
      status:"Success",
      data:books
    })
  });

  it('should throw an exception if the book with the specified id is not present', async()=>{

    // const mockBookId = 2;

    jest.spyOn(bookRepo, 'findOne').mockResolvedValue(null);

    await expect(bookService.getBooksById).rejects.toThrow(NotFoundException);
  });


});
