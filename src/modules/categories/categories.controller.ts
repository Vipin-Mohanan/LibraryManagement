/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/addCategory')
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
      const savedCategory = await this.categoriesService.addCategory(createCategoryDto);
     return ({
      status: "success",
      data:savedCategory
      });
  }

  @Get('/getAll')
  async getAllCategory(){
     const getAllCategories =await this.categoriesService.getAllCategory();
    return ({
      status:"Success",
      data:getAllCategories
    })
  }

  
}
