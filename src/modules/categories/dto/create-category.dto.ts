/* eslint-disable prettier/prettier */

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateCategoryDto {

    @PrimaryGeneratedColumn()
    category_id ?: number;

    @Column()
    category_name: string;
}
