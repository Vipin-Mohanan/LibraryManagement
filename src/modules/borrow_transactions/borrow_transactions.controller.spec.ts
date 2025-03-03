/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { BorrowTransactionsController } from './borrow_transactions.controller';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { ForbiddenException } from '@nestjs/common';

describe('BorrowTransactionsController', () => {
  let controller: BorrowTransactionsController;
  let service: BorrowTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowTransactionsController],
      providers: [
        {
          provide: BorrowTransactionsService,
          useValue: {
            borrowBook: jest.fn(),
            borrowBookDetails: jest.fn(),
            updateReturnedBook: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BorrowTransactionsController>(BorrowTransactionsController);
    service = module.get<BorrowTransactionsService>(BorrowTransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should borrow a book successfully', async () => {
    const borrowDto: CreateBorrowTransactionDto = {
      user_id: 1,
      book_id: 1,
      borrow_date: new Date().toISOString(),
      due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
      status: 'borrowed',
      return_date: null,
    };

    const mockResponse = { status: 'success', data: { book_id: 1, copies_available: 1 } };
    jest.spyOn(service, 'borrowBook').mockResolvedValue(mockResponse);

    const result = await controller.borrowBook(borrowDto);

    expect(service.borrowBook).toHaveBeenCalledWith(borrowDto);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if borrowing a book fails', async () => {
    const borrowDto: CreateBorrowTransactionDto = {
      user_id: 1,
      book_id: 1,
      borrow_date: new Date().toISOString(),
      due_date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
      status: 'borrowed',
      return_date: null,
    };

    jest.spyOn(service, 'borrowBook').mockRejectedValue(new ForbiddenException('Book is not available'));

    await expect(controller.borrowBook(borrowDto)).rejects.toThrow(ForbiddenException);
    expect(service.borrowBook).toHaveBeenCalledWith(borrowDto);
  });

  it('should return borrowed book details', async () => {
    const mockResponse = { status: 'success', data: [{ book_id: 1, user_id: 1, status: 'borrowed' }] };

    jest.spyOn(service, 'borrowBookDetails').mockResolvedValue(mockResponse);

    const result = await controller.borrowBookDetails(1);

    expect(service.borrowBookDetails).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if borrowed book details cannot be retrieved', async () => {
    jest.spyOn(service, 'borrowBookDetails').mockRejectedValue(new ForbiddenException('User not found'));

    await expect(controller.borrowBookDetails(1)).rejects.toThrow(ForbiddenException);
    expect(service.borrowBookDetails).toHaveBeenCalledWith(1);
  });

  it('should successfully update a returned book', async () => {
    const mockResponse = { status: 'Success', data: { affected: 1 } };

    jest.spyOn(service, 'updateReturnedBook').mockResolvedValue(mockResponse);

    const result = await controller.updateReturnedBook(1, 1);

    expect(service.updateReturnedBook).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when trying to return a book that was never borrowed', async () => {
    jest.spyOn(service, 'updateReturnedBook').mockRejectedValue(new ForbiddenException('No borrow logs for this user'));

    await expect(controller.updateReturnedBook(1, 1)).rejects.toThrow(ForbiddenException);
    expect(service.updateReturnedBook).toHaveBeenCalledWith(1, 1);
  });
});
