/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Optional } from '@nestjs/common';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

        @Optional()
        category_id : number;
    
        @Optional()
        category_name: string;
}
