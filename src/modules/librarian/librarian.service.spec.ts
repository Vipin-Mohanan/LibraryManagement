/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LibrarianService } from './librarian.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Librarian } from './entities/librarian.entity';
import { User } from '../user/entities/user.entity';
import { CreateLibrarianDto, librarianRole } from './dto/create-librarian.dto';
import * as bcrypt from 'bcryptjs';
import { ForbiddenException } from '@nestjs/common';

describe('LibrarianService', () => {
  let librarianService: LibrarianService;
  let librarianRepository: Repository<Librarian>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibrarianService,
        {
          provide: getRepositoryToken(Librarian),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    librarianService = module.get<LibrarianService>(LibrarianService);
    librarianRepository = module.get<Repository<Librarian>>(getRepositoryToken(Librarian));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(librarianService).toBeDefined();
  });

  describe('registerNewLibrarian', () => {
    const librarianDto: CreateLibrarianDto = {
  
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone_number: 1234567890,
      address: '123 Library Street',
      role: librarianRole.Librarian,
      confirmPassword: 'password123'
    };

    it('should register a new librarian', async () => {
      jest.spyOn(librarianRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(librarianRepository, 'create').mockReturnValue(librarianDto as Librarian);
      jest.spyOn(librarianRepository, 'save').mockResolvedValue(librarianDto as Librarian);

      await expect(librarianService.registerNewLibrarian(librarianDto)).resolves.not.toThrow();
      expect(librarianRepository.create).toHaveBeenCalledWith({
        name: librarianDto.name,
        email: librarianDto.email,
        password: 'hashedPassword',
        phone_number: librarianDto.phone_number,
        address: librarianDto.address,
        role: librarianDto.role,
      });
      expect(librarianRepository.save).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if librarian already exists', async () => {
      jest.spyOn(librarianRepository, 'findOne').mockResolvedValue(librarianDto as Librarian);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(librarianService.registerNewLibrarian(librarianDto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw an error if user with email already exists', async () => {
      jest.spyOn(librarianRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        librarianDto,
      } as unknown as User);
      
      await expect(librarianService.registerNewLibrarian(librarianDto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should handle errors properly', async () => {
      jest.spyOn(librarianRepository, 'findOne').mockRejectedValue(new Error('Database error'));

      await expect(librarianService.registerNewLibrarian(librarianDto)).rejects.toThrow('Database error');
    });
  });
});
