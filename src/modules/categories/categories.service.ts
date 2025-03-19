/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCategoryError, CategoryNotFoundError } from 'src/filters/errorMessage';

@Injectable()
export class CategoriesService {
 
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}


/**
   * Adds a new category to the database.
   * 
   * @param {CreateCategoryDto} categoryDto - The category details to be added.
   * @returns {Promise<Category>} The saved category entity.
   * @throws {Error} If the category cannot be added (calls `AddCategoryError`).
   * @example
   * ```typescript
   * const categoryDto = { name: 'Technology' };
   * const savedCategory = await categoriesService.addCategory(categoryDto);
   * ```
   */

  async addCategory(categoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(categoryDto);
    const savedCategory = await this.categoryRepo.save(newCategory);
    if(!savedCategory)
      {
        AddCategoryError()
      }
   
    return savedCategory;
  }


   /**
   * Retrieves all categories from the database.
   * 
   * @returns {Promise<Category[]>} A list of all available categories.
   * @throws {Error} If no categories are found (calls `CategoryNotFoundError`).
   * @example
   * ```typescript
   * const categories = await categoriesService.getAllCategory();
   * console.log(categories);
   * ```
   */
  async getAllCategory() {
    const getAllCategories = await this.categoryRepo.find();

    if(getAllCategories.length===0)
    {
      CategoryNotFoundError()
    }

    return getAllCategories;
    
  }
  
}
