/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import { Librarian } from '../librarian/entities/librarian.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

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
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    librarianRepository = module.get<Repository<Librarian>>(getRepositoryToken(Librarian));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should throw an exception if userdto is empty', async () => {
    await expect(userService.signup(null)).rejects.toThrow(ForbiddenException);
  });

 

  it('should throw an exception if the user already exists', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Street',
      password: 'password123',
      confirmPassword: 'password123',
      phone_number: 1234567890,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({ email: 'john@example.com' } as User);

    await expect(userService.signup(userDto)).rejects.toThrow(ForbiddenException);
  });

  it('should hash the password and create a new user', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Street',
      password: 'password123',
      confirmPassword: 'password123',
      phone_number: 1234567890,
      membership_date: new Date(),
      membership_status: true,
      borrowtransactions: [],
    };
  
    const userWithHashedPassword = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Street',
      password: 'hashedPassword123', 
     
    };
  
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(librarianRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword123');
    jest.spyOn(userRepository, 'create').mockReturnValue(userWithHashedPassword as User);
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userWithHashedPassword as User);
  
    const result = await userService.signup(userDto);
    expect(result).toEqual(userWithHashedPassword);  
    expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
       name: 'John Doe',
      email: 'john@example.com',
      address: '123 Street',
      password: 'hashedPassword123',  
      phone_number: 1234567890,
    
    }));
      expect(userRepository.save).toHaveBeenCalledWith(userWithHashedPassword as User);
  });
  
});
