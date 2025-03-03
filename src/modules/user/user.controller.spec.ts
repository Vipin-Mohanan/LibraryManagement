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
            signup: jest.fn().mockResolvedValue({ id: 1, name: 'Test User', email: 'test@example.com' }),
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
    it('should call UserService.signup and return the result', async () => {
      const dto: CreateUserDto = { name: 'Test User', email: 'test@example.com', password: 'password123',confirmPassword:'password123',address:'arya homes',phone_number:12345678 };
      const result = await userController.signup(dto);

      expect(userService.signup).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
    });
  });





  
});
