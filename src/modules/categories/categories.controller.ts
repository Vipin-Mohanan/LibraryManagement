/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../../guard/user-auth/user-auth.guard';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Adds a new category to the system.
   *
   * @param {CreateCategoryDto} createCategoryDto - The category details to be added.
   * @returns {Promise<{ status: string, data: any }>} The saved category data.
   */

  @Post('/addCategory')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Add a category' })
  @ApiResponse({ status: 201, description: 'Insert a new category' })
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const savedCategory =
      await this.categoriesService.addCategory(createCategoryDto);

    return {
      status: 'success',
      data: savedCategory,
    };
  }

  /**
   * Retrieves all available categories.
   *
   * @returns {Promise<{ status: string, data: any[] }>} A list of all categories.
   */

  @Get('/getAll')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 201,
    description: 'Displays all the available categories',
  })
  async getAllCategory() {
    const getAllCategories = await this.categoriesService.getAllCategory();
    return {
      status: 'Success',
      data: getAllCategories,
    };
  }
}
