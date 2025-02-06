/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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
    console.log(`Category saved with ID: ${savedCategory.category_id}`);
    return savedCategory;
  }

  
  async viewCategores() {
    const catogories =await this.categoryRepo.find();
    console.log(catogories);
    return catogories;
  }



  
}
