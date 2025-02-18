/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepo: Repository<Category>;

  beforeEach(async () => {
    const mockCategoryRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepo,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('addCategory', () => {
    it('should add a new category successfully', async () => {
      const categoryDto: CreateCategoryDto = { category_name: 'Fiction' };
      const createdCategory: Category = { category_id: 1, category_name: 'Fiction', books: [] };
  
      // Mock `create` and `save` methods
      categoryRepo.create = jest.fn().mockReturnValue(createdCategory);
      categoryRepo.save = jest.fn().mockResolvedValue(createdCategory);
  
      const result = await service.addCategory(categoryDto);
  
      expect(categoryRepo.create).toHaveBeenCalledWith(categoryDto);
      expect(categoryRepo.save).toHaveBeenCalledWith(createdCategory);
      expect(result).toEqual({
        status: 'success',
        data: createdCategory,
      });
    });
  });

  describe('getAllCategory', () => {
    it('should return all categories successfully', async () => {
      const mockCategories = [
        { category_id: 1, category_name: 'Fiction', books: [] },
        { category_id: 2, category_name: 'Non-Fiction', books: [] },
      ];
  
      categoryRepo.find = jest.fn().mockResolvedValue(mockCategories);
  
      const result = await service.getAllCategory();
  
      expect(categoryRepo.find).toHaveBeenCalled();
      expect(result).toEqual({
        status: 'Success',
        data: mockCategories,
      });
    });
  
    it('should throw NotFoundException if no categories are found', async () => {
      categoryRepo.find = jest.fn().mockResolvedValue([]);
  
      await expect(service.getAllCategory()).rejects.toThrow(
        new NotFoundException('No categories found'),
      );
    });
  });
  

});

