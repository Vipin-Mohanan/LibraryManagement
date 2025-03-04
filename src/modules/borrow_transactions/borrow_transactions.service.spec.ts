/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { BorrowTransactionsService } from '../borrow_transactions/borrow_transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowTransaction } from './entities/borrow_transaction.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { ForbiddenException } from '@nestjs/common';

describe('BorrowTransactionsService', () => {
  let service: BorrowTransactionsService;
  let borrowRepo: Repository<BorrowTransaction>;
  let bookRepo: Repository<Book>;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowTransactionsService,
        {
          provide: getRepositoryToken(BorrowTransaction),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              innerJoin: jest.fn().mockReturnThis(),
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue(null),
              getMany: jest.fn().mockResolvedValue([]),
            })),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Book),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BorrowTransactionsService>(BorrowTransactionsService);
    borrowRepo = module.get<Repository<BorrowTransaction>>(getRepositoryToken(BorrowTransaction));
    bookRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if the book is not available for borrowing', async () => {
    const borrowDto: CreateBorrowTransactionDto = {
      user_id: 1,
      book_id: 1,
      borrow_date: new Date().toISOString(),
      due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
      status: 'borrowed',
      return_date: null,
    };

    jest.spyOn(bookRepo, 'findOne').mockResolvedValue({ book_id: 1, copies_available: 0 } as Book);

    await expect(service.borrowBook(borrowDto)).rejects.toThrow(ForbiddenException);
    expect(bookRepo.findOne).toHaveBeenCalledWith({ where: { book_id: 1 } });
  });

  it('should throw an error if the user is not found', async () => {
    jest.spyOn(bookRepo, 'findOne').mockResolvedValue({ book_id: 1, copies_available: 1 } as Book);
    jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

    await expect(service.borrowBook({ user_id: 1, book_id: 1, status: 'borrowed' } as CreateBorrowTransactionDto))
      .rejects.toThrow(ForbiddenException);

    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { user_id: 1 } });
  });

  it('should throw an error if the user has already borrowed the book and has not returned it', async () => {
    const borrowDto: CreateBorrowTransactionDto = {
      user_id: 1,
      book_id: 1,
      borrow_date: new Date().toISOString(),
      due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
      status: 'borrowed',
      return_date: null,
    };

    jest.spyOn(bookRepo, 'findOne').mockResolvedValue({ book_id: 1, copies_available: 1 } as Book);
    jest.spyOn(userRepo, 'findOne').mockResolvedValue({ user_id: 1 } as User);
    jest.spyOn(borrowRepo, 'createQueryBuilder').mockImplementation(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue({}),
    }) as any);

    await expect(service.borrowBook(borrowDto)).rejects.toThrow(ForbiddenException);
  });

  it('should retrieve borrowed book details', async () => {
    jest.spyOn(borrowRepo, 'createQueryBuilder').mockImplementation(() => ({
      innerJoin: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([{ book_id: 1, user_id: 1, status: 'borrowed' }]),
    }) as any);

    const result = await service.borrowBookDetails(1);
    expect(result).toEqual({
      status: 'success',
      data: [{ book_id: 1, user_id: 1, status: 'borrowed' }],
    });
  });

  it('should successfully update a returned book', async () => {
    jest.spyOn(borrowRepo, 'findOne').mockResolvedValue({
      user: { user_id: 1 },
      books: { book_id: 1 },
    } as BorrowTransaction);

    jest.spyOn(borrowRepo, 'update').mockResolvedValue({ affected: 1 } as any);

    const result = await service.updateReturnedBook(1, 1);

    expect(result).toEqual({
      status: 'Success',
      data: { affected: 1 },
    });

    expect(borrowRepo.findOne).toHaveBeenCalledWith({
      where: { user: { user_id: 1 }, books: { book_id: 1 } },
      relations: ['user', 'books'],
    });

    expect(borrowRepo.update).toHaveBeenCalledWith(
      { user: 1, books: 1 },
      { status: 'returned', return_date: expect.any(Date) }
    );
  });

  it('should throw an error when trying to return a book that was never borrowed', async () => {
    jest.spyOn(borrowRepo, 'findOne').mockResolvedValue(null);

    await expect(service.updateReturnedBook(1, 1)).rejects.toThrow(ForbiddenException);
  });
});
