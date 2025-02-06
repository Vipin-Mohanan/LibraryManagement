/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/addCategory')
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.addCategory(createCategoryDto);
  }

  @Get('/getAll')
  async getAllCategory(){
    return this.categoriesService.getAllCategory();
  }


}
