/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import { Librarian } from '../librarian/entities/librarian.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BorrowTransaction } from "../../borrow_transactions/entities/borrow_transaction.entity";
import { ForbiddenException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let librarianRepository: Repository<Librarian>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Librarian),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    // userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    // librarianRepository = module.get<Repository<Librarian>>(getRepositoryToken(Librarian));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should throw an exception if userdto is empty', async () => {
    await expect(userService.signup(null)).rejects.toThrow(ForbiddenException);
  });

  // it('should throw an exception if passwords do not match', async () => {
  //   const userDto = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     address: '123 Street',
  //     password: 'password123',
  //     confirmPassword: 'password456',
  //     phone_number: 1234567890,
  //   };
  //   await expect(userService.signup(userDto)).rejects.toThrow(ForbiddenException);
  // });

  // it('should throw an exception if the user already exists', async () => {
  //   const userDto = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     address: '123 Street',
  //     password: 'password123',
  //     confirmPassword: 'password123',
  //     phone_number: 1234567890,
  //   };

  //   jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({ email: 'john@example.com' } as User);

  //   await expect(userService.signup(userDto)).rejects.toThrow(ForbiddenException);
  // });

  // it('should hash the password and create a new user', async () => {
  //   const userDto = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     address: '123 Street',
  //     password: 'password123',
  //     confirmPassword: 'password123',
  //     phone_number: 1234567890,
  //   };

  //   jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
  //   jest.spyOn(librarianRepository, 'findOne').mockResolvedValueOnce(null);
  //   jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword123');
  //   // jest.spyOn(userRepository, 'create').mockReturnValue(userDto as User);
  //   // jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userDto as User);

  //   const result = await userService.signup(userDto);

  //   expect(result).toEqual(userDto);
  //   expect(userRepository.create).toHaveBeenCalledWith({
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     password: 'hashedPassword123',
  //     address: '123 Street',
  //     phone_number: 123456789,
  //   });
  //   expect(userRepository.save).toHaveBeenCalledWith(userDto);
  // });
});
