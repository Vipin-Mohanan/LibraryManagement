/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const mockCategoriesService = {
      addCategory: jest.fn(),
      getAllCategory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addCategory', () => {
    it('should add a new category successfully', async () => {
      const categoryDto: CreateCategoryDto = { category_name: 'Fiction' };
      const mockResponse = { status: 'success', data: { category_id: 1, category_name: 'Fiction', books: [] } };

      jest.spyOn(service, 'addCategory').mockResolvedValue(mockResponse);

      const result = await controller.addCategory(categoryDto);

      expect(service.addCategory).toHaveBeenCalledWith(categoryDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAllCategory', () => {
    it('should return all categories successfully', async () => {
      const mockCategories = [
        { category_id: 1, category_name: 'Fiction', books: [] },
        { category_id: 2, category_name: 'Non-Fiction', books: [] },
      ];
      const mockResponse = { status: 'Success', data: mockCategories };

      jest.spyOn(service, 'getAllCategory').mockResolvedValue(mockResponse);

      const result = await controller.getAllCategory();

      expect(service.getAllCategory).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should throw NotFoundException if no categories exist', async () => {
      jest.spyOn(service, 'getAllCategory').mockRejectedValue(new NotFoundException('No categories found'));

      await expect(controller.getAllCategory()).rejects.toThrow(NotFoundException);
    });
  });
});
