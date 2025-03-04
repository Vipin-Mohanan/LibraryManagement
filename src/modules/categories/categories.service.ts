/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
 
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async addCategory(categoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(categoryDto);
    const savedCategory = await this.categoryRepo.save(newCategory);
    if(!savedCategory)
      {
        throw new Error('Cannot add category')
      }
   
    return savedCategory;
  }

  async getAllCategory() {
    const getAllCategories = await this.categoryRepo.find();

    if(getAllCategories.length===0)
    {
      throw new NotFoundException('No categories found')
    }


    return getAllCategories;
    
  }
  
}
