/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            addCategory: jest.fn().mockResolvedValue({ id: 1, category_name: 'Test Category' }),
            getAllCategory: jest.fn().mockResolvedValue([{ id: 1, category_name: 'Test Category' }]),
          },
        },
      ],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('addCategory', () => {
    it('should add a category and return the saved category', async () => {
      const createCategoryDto: CreateCategoryDto = { category_name: 'Test Category' };
      const result = await categoriesController.addCategory(createCategoryDto);
      expect(result).toEqual({ status: 'success', data: { id: 1, category_name: 'Test Category' } });
      expect(categoriesService.addCategory).toHaveBeenCalledWith(
        createCategoryDto,
      );
    });
  });

  describe('getAllCategory', () => {
    it('should return all categories', async () => {
      const result = await categoriesController.getAllCategory();
      expect(result).toEqual({ status: 'Success', data: [{ id: 1, category_name: 'Test Category' }] });
      expect(categoriesService.getAllCategory).toHaveBeenCalled();
    });
  });
});
