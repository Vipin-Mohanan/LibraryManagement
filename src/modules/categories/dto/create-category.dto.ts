/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateCategoryDto {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    category_id ?: number;

    @ApiProperty()
    @Column()
    category_name: string;
}
