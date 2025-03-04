/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            signup: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Test User',
              email: 'test@example.com',
            }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('signup', () => {
    const validDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      address: 'Arya Homes',
      phone_number: 12345678,
    };

    it('should call UserService.signup with the correct DTO', async () => {
      const result = await userController.signup(validDto);

      expect(userService.signup).toHaveBeenCalledWith(validDto);
      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw an error if UserService.signup fails', async () => {
      jest.spyOn(userService, 'signup').mockRejectedValue(new Error('Signup failed'));

      await expect(userController.signup(validDto)).rejects.toThrow('Signup failed');
    });
  });
});
