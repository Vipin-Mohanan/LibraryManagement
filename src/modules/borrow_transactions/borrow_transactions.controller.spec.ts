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
    jest.spyOn(controller, 'borrowBook').mockResolvedValue(mockResponse as any);

    const result = await controller.borrowBook(borrowDto);

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

    const mockBookData =  [
          {
              "transaction_id": 101,
              "borrow_date": "2025-02-20T08:30:15.123Z",
              "due_date": "2025-03-06T10:00:00.000Z",
              "return_date": null,
              "status": "borrowed",
              "books": {
                  "book_id": 25,
                  "title": "The Great Adventure",
                  "author": "John Doe",
                  "description": "An epic tale of adventure and courage.",
                  "publisher": "Adventure Books Ltd.",
                  "publication_year": 2015,
                  "isbn": "978-3-16-148410-0",
                  "copies_available": 4,
                  "total_copies": 5,
                  "images": [
                      {
                          "type": "Buffer",
                          "data": [255, 216, 255, 224, 0, 16, 74, 70, 73, 70]
                      }
                  ]
              }
          },
          {
              "transaction_id": 102,
              "borrow_date": "2025-02-22T14:15:45.789Z",
              "due_date": "2025-03-08T16:45:00.000Z",
              "return_date": "2025-03-05T12:30:00.000Z",
              "status": "returned",
              "books": {
                  "book_id": 30,
                  "title": "Mystery of the Lost Island",
                  "author": "Jane Smith",
                  "description": "A thrilling mystery novel set on a deserted island.",
                  "publisher": "Mystery Press",
                  "publication_year": 2020,
                  "isbn": "978-1-23-456789-7",
                  "copies_available": 2,
                  "total_copies": 2,
                  "images": [
                      {
                          "type": "Buffer",
                          "data": [255, 216, 255, 225, 0, 16, 69, 120, 105, 102]
                      }
                  ]
              }
          }
      ]
  
  
    const mockResponse = { status: 'success', data: mockBookData };
    jest.spyOn(service, 'borrowBookDetails').mockResolvedValue(mockBookData as any);
    const result = await controller.borrowBookDetails('1');
    expect(service.borrowBookDetails).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if borrowed book details cannot be retrieved', async () => {
    jest.spyOn(service, 'borrowBookDetails').mockRejectedValue(new ForbiddenException('User not found'));

    await expect(controller.borrowBookDetails('1')).rejects.toThrow(ForbiddenException);
    expect(service.borrowBookDetails).toHaveBeenCalledWith(1);
  });


  it('should successfully update a returned book', async () => {
    const mockReturnData = { return_date: new Date('2025-03-05T12:30:00.000Z') };

    jest.spyOn(service, 'updateReturnedBook').mockResolvedValue(mockReturnData as any);

    const user_id = 1;
    const book_id = 100;
    
    const result = await controller.updateReturnedBook(user_id, book_id);

    expect(service.updateReturnedBook).toHaveBeenCalledWith(user_id, book_id);
    expect(result).toEqual({
      status: 'Success',
      data: {
        returnDate: mockReturnData.return_date,
      },
    });
  });

  it('should throw an error when trying to return a book that was never borrowed', async () => {
    jest.spyOn(service, 'updateReturnedBook').mockRejectedValue(new ForbiddenException('No borrow logs for this user'));

    await expect(controller.updateReturnedBook(1, 1)).rejects.toThrow(ForbiddenException);
    expect(service.updateReturnedBook).toHaveBeenCalledWith(1, 1);
  });

  
});
