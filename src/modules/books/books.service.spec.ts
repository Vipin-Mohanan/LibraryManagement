/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BooksService', () => {
  let bookService: BooksService;
  let bookRepo: Repository<Book>;
  let categoryRepo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(
              () =>
                ({
                  leftJoinAndSelect: jest.fn().mockReturnThis(),
                  where: jest.fn().mockReturnThis(),
                  orWhere: jest.fn().mockReturnThis(),
                  orderBy: jest.fn().mockReturnThis(),
                  getMany: jest.fn().mockResolvedValue([]),
                }) as any,
            ),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
    categoryRepo = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('addBook', () => {
    it('should throw an error if category is not existing', async () => {
      const bookData = {
        title: 'bookDto.title',
        author: 'bookDto.author',
        description: 'bookDto.description',
        publisher: 'bookDto.publisher',
        publication_year: 2003,
        isbn: 'bookDto.isbn',
        category_id: 1,
        copies_available: 10,
        total_copies: 20,
        images: [],
      };
      jest.spyOn(categoryRepo, 'findOne').mockResolvedValue(null); //category illa nn set cheyyunu
      expect(bookService.addBook(bookData, [])).rejects.toThrow(
        NotFoundException,
      );
    });

    it('it should create a book ', async () => {
      const mockCategory = {
        category_id: 1,
        category_name: 'Action',
        books: [],
      } as Category;
      jest.spyOn(categoryRepo, 'findOne').mockResolvedValue(mockCategory);

      //saved book data
      const bookData: Book = {
        title: 'bookDto.title',
        author: 'bookDto.author',
        description: 'bookDto.description',
        publisher: 'bookDto.publisher',
        publication_year: 2003,
        isbn: 'bookDto.isbn',
        category: mockCategory,
        copies_available: 10,
        total_copies: 20,
        images: [],
      };

      //data passing to function
      const bookDto = {
        title: 'bookDto.title',
        author: 'bookDto.author',
        description: 'bookDto.description',
        publisher: 'bookDto.publisher',
        publication_year: 2003,
        isbn: 'bookDto.isbn',
        category_id: 1, //different
        copies_available: 10,
        total_copies: 20,
        images: [],
      };

      jest.spyOn(bookRepo, 'create').mockReturnValue(bookData);
      jest.spyOn(bookRepo, 'save').mockResolvedValue(bookData);

      const result = await bookService.addBook(bookDto, []);

      expect(bookRepo.create).toHaveBeenCalledWith(
        expect.objectContaining(bookData),
      );
      expect(bookRepo.save).toHaveBeenCalledWith(bookData);
      expect(result).toEqual({
        status: 'Success',
        data: bookData,
      });
    });
  });

  describe('getAllBooks', () => {
    it('throw error if no data found', async () => {
      jest.spyOn(bookRepo, 'find').mockResolvedValue([]);
      expect(bookService.getAllBooks()).rejects.toThrow(NotFoundException);
    });

    it('should return all the books details', async () => {
      const mockBooks = [
        {
          title: 'bookDto.title',
          author: 'bookDto.author',
          description: 'bookDto.description',
          publisher: 'bookDto.publisher',
          publication_year: 2003,
          isbn: 'bookDto.isbn',
          category_id: 1, //different
          copies_available: 10,
          total_copies: 20,
          images: [],
          category: { category_id: 1, category_name: 'Fiction', books: [] },
        },
      ];
      jest.spyOn(bookRepo, 'find').mockResolvedValue(mockBooks);
      const result = await bookService.getAllBooks();
      expect(bookRepo.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        status: 'Success',
        data: mockBooks,
      });
    });
  });

  describe('getBookById', () => {
    it('should throw error if book not exist', async () => {
      jest.spyOn(bookRepo, 'findOne').mockResolvedValue(null);
      await expect(bookService.getBooksById(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return a book', async () => {
      const mockBook: Book = {
        title: 'bookDto.title',
        author: 'bookDto.author',
        description: 'bookDto.description',
        publisher: 'bookDto.publisher',
        publication_year: 2003,
        isbn: 'bookDto.isbn',
        copies_available: 10,
        total_copies: 20,
        images: [],
      };

      jest.spyOn(bookRepo, 'findOne').mockResolvedValue(mockBook);
      const result = await bookService.getBooksById(1);
      expect(result).toEqual({
        status: 'Success',
        data: mockBook,
      });
    });
  });

  describe('serchBook', () => {
    it('should throw NotFoundException if no books match the query', async () => {
      jest
        .spyOn(bookRepo.createQueryBuilder(), 'getMany')
        .mockResolvedValue([]);
      await expect(bookService.searchBook('Nonexistent Book')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return book', async () => {
      const mockBook: Book[] = [
        {
          book_id: 1,
          title: 'Book Title',
          author: 'Author Name',
          description: 'Book description',
          publisher: 'Publisher',
          publication_year: 2003,
          isbn: 'isbn',
          copies_available: 10,
          total_copies: 20,
          images: [],
        },
      ];
      jest.spyOn(bookRepo, 'createQueryBuilder').mockImplementation(
        () =>
          ({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            orWhere: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(mockBook),
          }) as any,
      );

      const result = await bookService.searchBook('Book Title');

      expect(result).toEqual({
        status: 'success',
        data: mockBook,
      });
    });
  });

  describe('getbooks categorywise', () => {
    it('should throw error if no books are found', async () => {
      jest
        .spyOn(bookRepo.createQueryBuilder(), 'getMany')
        .mockResolvedValue([]);
      await expect(bookService.getAllBooksCategorywise()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return categorized books successfully', async () => {
      const mockBooks = [
        {
          book_id: 1,
          title: 'Book 1',
          category: { category_name: 'Fiction' },
        },
        {
          book_id: 2,
          title: 'Book 2',
          category: { category_name: 'Fiction' },
        },
        {
          book_id: 3,
          title: 'Book 3',
          category: { category_name: 'Non-Fiction' },
        },
      ] as any[];

      jest.spyOn(bookRepo, 'createQueryBuilder').mockImplementation(
        () =>
          ({
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(mockBooks),
          }) as any,
      );

      const result = await bookService.getAllBooksCategorywise();

      expect(result).toEqual({
        status: 'success',
        data: [
          {
            category: 'Fiction',
            books: [
              {
                book_id: 1,
                title: 'Book 1',
                category: { category_name: 'Fiction' },
              },
              {
                book_id: 2,
                title: 'Book 2',
                category: { category_name: 'Fiction' },
              },
            ],
          },
          {
            category: 'Non-Fiction',
            books: [
              {
                book_id: 3,
                title: 'Book 3',
                category: { category_name: 'Non-Fiction' },
              },
            ],
          },
        ],
      });

      expect(bookRepo.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('edit book details', () => {
    const mockBook: UpdateBookDto = {
      title: 'book_title',
    };

    const existingBook: Book = {
      book_id: 1,
      title: '',
      author: 'Author Name',
      description: 'Book description',
      publisher: 'Publisher',
      publication_year: 2003,
      isbn: 'isbn',
      copies_available: 10,
      total_copies: 20,
      images: [],
    };
    const updatedBook: Book = {
      book_id: 1,
      title: 'book_title',
      author: 'Author Name',
      description: 'Book description',
      publisher: 'Publisher',
      publication_year: 2003,
      isbn: 'isbn',
      copies_available: 10,
      total_copies: 20,
      images: [],
    };

    it('should throw error', async () => {
      jest.spyOn(bookRepo, 'findOne').mockResolvedValue(null);
      await expect(
        bookService.editBookDetails(1, mockBook, []),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return updated book', async () => {
      jest.spyOn(bookRepo, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepo, 'save').mockResolvedValue(updatedBook);
      const result = await bookService.editBookDetails(1, mockBook, []);

      expect(bookRepo.findOne).toHaveBeenCalledWith({ where: { book_id: 1 } });
      expect(bookRepo.save).toHaveBeenCalledWith(updatedBook);
      expect(result).toEqual({
        status: 'success',
        data: updatedBook,
      });
    });
  });
});
