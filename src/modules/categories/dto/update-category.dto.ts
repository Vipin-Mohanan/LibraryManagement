/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Optional } from '@nestjs/common';
import { Column, PrimaryColumn } from 'typeorm';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

        @Optional()
        @PrimaryColumn()
        category_id : bigint;
    
        @Optional()
        @Column()
        category_name: string;
}
